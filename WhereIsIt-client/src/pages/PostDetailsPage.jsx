import { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { authContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const PostDetailsPage = () => {

    // for the title
    useTitle('Post Details Page');

    const item = useLoaderData();
    const { user } = useContext(authContext);

    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reItems, setReItems] = useState("");

    const {
        postType,
        thumbnail,
        title,
        description,
        category,
        location,
        date,
        userEmail: postUpdaterEmail,
        displayName: postUpdaterName,
        _id
    } = item;

    const {
        displayName: loginUserName,
        email: loginUserEmail,
        photoURL: loginUserImage,
    } = user;

    // Example function to check if _id exists in reItems
    const checkIdExists = (_id) => {
        const exists = reItems.some(item => item._id === _id);
        return exists;
    };

    useEffect(() => {
        fetch("https://where-is-it-server-six.vercel.app/AllRecoveredItemInfo",{credentials: 'include',})
            .then(res => res.json())
            .then(data => setReItems(data))
    }, [])

    // Toggle modal visibility with validation for recovered items
    const handleButtonClick = () => {

        if (checkIdExists(_id)) {
            Swal.fire({
                title: "Item already recovered",
                text: "This item has already been marked as recovered.",
                icon: "warning",
            });
            return;
        }
        setShowModal(true);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        const recoveredLocation = event.target.recoveredLocation.value;
        const recoveredDate = selectedDate?.toISOString().split("T")[0]; // Format date
        const recoveredDisplayName = loginUserName;
        const recoveredUserEmail = loginUserEmail;
        const recoveredUserImg = loginUserImage;

        const recoveredItemInfo = {
            ...item,
            recoveredLocation,
            recoveredDate,
            recoveredDisplayName,
            recoveredUserEmail,
            recoveredUserImg,
        };

        // Send data to the server
        fetch("https://where-is-it-server-six.vercel.app/addRecoveredItemInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoveredItemInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully Recovered Item",
                        icon: "success",
                    });
                    event.target.reset();
                    setSelectedDate(null); // Reset date
                }
            })
            .catch((error) => {
                console.error("Error:", error); // Handle any network errors
            });

        setShowModal(false);
    };

    return (
        <div className="py-5 px-5">
            <div className="lg:flex">
                {/* Card Image */}
                <img src={thumbnail} alt={title} className="w-full lg:w-[40%] object-cover" />

                <div className="p-5">
                    {/* Card Content */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
                    <p className="text-sm text-gray-500 mb-3"><strong>Post Type:</strong> {postType}</p>
                    <p className="text-sm text-gray-500 mb-3"><strong>Category:</strong> {category}</p>
                    <p className="text-sm text-gray-500 mb-3"><strong>Location:</strong> {location}</p>
                    <p className="text-md text-gray-700 mb-3"><strong>Description:</strong> {description}</p>
                    <p>Created By:</p>
                    <p className="text-sm text-gray-500 mb-3"><strong>Name:</strong> {postUpdaterName}</p>
                    <p className="text-sm text-gray-500 mb-3"><strong>Email:</strong> {postUpdaterEmail}</p>
                    <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>

                    {/* Conditional Button */}
                    <button
                        onClick={handleButtonClick}
                        className="mt-4 px-5 py-2 rounded text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                        {postType === "Lost" ? "Found This!" : postType === "Found" ? "This is Mine!" : "Take Action"}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Recovery Information</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Recovered Location</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded"
                                    name="recoveredLocation"
                                    placeholder="Where was the item given/received?"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Recovered Date</label>
                                <ReactDatePicker
                                    name="recoveredDate"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    className="w-full px-4 py-2 border rounded"
                                    dateFormat="yyyy-MM-dd"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700">Recovered Person Info</label>
                                <div className="border p-3 rounded bg-gray-100">
                                    <input
                                        type="text"
                                        name="recoveredDisplayName"
                                        value={loginUserName}
                                        readOnly
                                        className="border p-2 rounded w-full bg-gray-100"
                                    />
                                    <input
                                        type="email"
                                        name="recoveredUserEmail"
                                        value={loginUserEmail}
                                        readOnly
                                        className="border p-2 rounded w-full bg-gray-100 mt-2"
                                    />
                                    <img src={loginUserImage} name="recoveredUserImg" alt="User" className="w-16 h-16 rounded-full" />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button type="submit" className="mt-4 px-5 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">Submit</button>
                                <button onClick={() => setShowModal(false)} className="mt-2 text-white bg-red-400 px-5 py-2 rounded-md" > Close </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetailsPage;