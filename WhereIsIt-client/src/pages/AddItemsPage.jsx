import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { authContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';
import useTitle from "../hooks/useTitle";

const AddItems = () => {

    // for the title
    useTitle('Add Items Page');

    const { user } = useContext(authContext);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = e => {
        e.preventDefault();
        const postType = e.target.postType.value;
        const thumbnail = e.target.thumbnail.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const date = e.target.dateLost.value;
        const userEmail = e.target.userEmail.value;
        const displayName = e.target.displayName.value;

        const newItems = {
            postType,
            thumbnail,
            title,
            description,
            category,
            location,
            date,
            userEmail,
            displayName,
        };

        fetch('https://where-is-it-server-six.vercel.app/addItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newItems),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully added Item",
                        icon: "success",
                    });
                    e.target.reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-6 text-center">Add Lost & Found Item</h1>
            <form onSubmit={handleSubmit} className="space-y-6 border bg-white p-6 shadow-lg">
                {/* Post Type */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Post Type</label>
                    <select name="postType" className="border px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666F2]">
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                {/* Thumbnail */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Thumbnail URL</label>
                    <input
                        type="text"
                        name="thumbnail"
                        className="border px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666F2]"
                        required
                    />
                </div>

                {/* Title */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        className="border px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666F2]"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter description"
                        className="border px-5 py-2  focus:outline-none focus:ring-2 focus:ring-[#6666F2]"
                        rows="2"
                        required
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Category</label>
                    <select name="category" className="border px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666F2]">
                        <option value="Pets">Pets</option>
                        <option value="Documents">Documents</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className="border px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666F2]"
                        required
                    />
                </div>

                {/* Date Lost */}
                <div className="flex flex-col">
                    <label className="font-medium mb-2">Date Lost</label>
                    <DatePicker
                        name="dateLost"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        className="border px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666F2]"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                {/* Contact Information */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="font-medium mb-2 mr-2">Contact Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={user.displayName}
                            readOnly
                            className="border px-5 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="font-medium mb-2 mr-2">Contact Email</label>
                        <input
                            type="email"
                            name="userEmail"
                            value={user.email}
                            readOnly
                            className="border px-5 py-2 bg-gray-100"
                        />
                    </div>
                </div>

                {/* Add Post Button */}
                <div>
                    <button type="submit" className="w-full  text-white py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition ease-in-out duration-200">
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItems;