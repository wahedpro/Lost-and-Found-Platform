const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://whereisit-a11.netlify.app'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ub1fi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// verify JWT token 
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log("Token received: ", token);
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Forbidden: Invalid token.' });
        }
        req.decoded = decoded;
    })
    next();
};

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const ItemsCollection = client.db('WhereIsItdb').collection('Items');
        const RecoveredItemsCollection = client.db('WhereIsItdb').collection('RecoveredItems');

        // auth related APIs 
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1day' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            }).send({ success: true });
        });


        app.post('/logout', async(req, res) => {
            res.clearCookie('token', {
                maxAge: 0,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            }).send({ success: true });
        });

        // add new item on the database
        app.post('/addItems', verifyToken, async (req, res) => {
            const newItems = req.body;
            const result = await ItemsCollection.insertOne(newItems);
            res.send(result);
        })

        // get all the items on the database
        app.get('/addItems', async (req, res) => {
            const cursor = ItemsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/allItems', async (req, res) => {
            const search = req.query.search;
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
            const limit = parseInt(req.query.limit) || 6; // Default to 6 items per page if not provided
            const skip = (page - 1) * limit; // Calculate the number of items to skip

            let query = {};

            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { location: { $regex: search, $options: 'i' } }
                ];
            }

            // Count the total number of items for pagination
            const totalItems = await ItemsCollection.countDocuments(query);

            // Fetch the items for the current page
            const items = await ItemsCollection.find(query).skip(skip).limit(limit).toArray();

            // Send both the items and the total count to the client
            res.send({
                items,
                total: totalItems
            });
        });


        // get the single item for the update on the database
        app.get('/addItems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ItemsCollection.findOne(query);
            res.send(result);
        })

        // update the item on the database
        app.put('/addItems/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedItem = req.body;
            const item = {
                $set: {
                    thumbnail: updatedItem.thumbnail,
                    title: updatedItem.title,
                    postType: updatedItem.postType,
                    description: updatedItem.description,
                    category: updatedItem.category,
                    date: updatedItem.date,
                    location: updatedItem.location,
                }
            }

            const result = await ItemsCollection.updateOne(query, item, options);
            res.send(result);
        })

        // delete item on the database
        app.delete('/addItems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ItemsCollection.deleteOne(query);
            res.send(result);
        })

        // view single item details
        app.get("/itemDetails/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const item = await ItemsCollection.findOne(query);
            res.send(item);
        });

        // recovered item add on the database
        app.post('/addRecoveredItemInfo', async (req, res) => {
            const newRecoveredItem = req.body;
            const result = await RecoveredItemsCollection.insertOne(newRecoveredItem);
            res.send(result);
        })

        // get all the recovered items on the database
        app.get('/addRecoveredItemInfo', verifyToken, async (req, res) => {
            const email = req.query.email;
            const query = { recoveredUserEmail: email }
            if (req.decoded.email !== req.query.email) {
                return res.status(403).send({ message: 'Forbidden: Invalid token.' });
            }
            const result = await RecoveredItemsCollection.find(query).toArray();
            res.send(result);
        })

        // get all the recovered items on the database
        app.get('/AllRecoveredItemInfo', verifyToken, async (req, res) => {
            const cursor = RecoveredItemsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("WhereIsIt server is running");
})

app.listen(port, () => {
    console.log(`WhereIsIt server is running on port: ${port}`);
})