import {useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { authContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';
import useTitle from "../hooks/useTitle";

const UpdateItemsPage = () => {

    // for the title
    useTitle('Update Items Page');

    // const item = useLoaderData();

    const { user } = useContext(authContext);
    const [date, setDate] = useState(new Date());
    const { id } = useParams()

    const [item, setItem] = useState({})

    useEffect(() => {
        fetch(`https://where-is-it-server-six.vercel.app/addItems/${id}`,{credentials: 'include',})
            .then(res => res.json())
            .then(data => setItem(data))
    }, [id])


    const handleUpdateItem = e => {
        e.preventDefault();
        const postType = e.target.postType.value;
        const thumbnail = e.target.thumbnail.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const userEmail = e.target.userEmail.value;
        const displayName = e.target.displayName.value;

        const updatedItem = { postType, thumbnail, title, description, category, location, date, userEmail, displayName };

        // Send updated data to the server
        fetch(`https://where-is-it-server-six.vercel.app/addItems/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updatedItem),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: "successfully updated Item  !",
                        icon: "success",
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Update Lost & Found Item</h1>
            <form onSubmit={handleUpdateItem} className="space-y-4">
                {/* Post Type */}
                <div>
                    <label className="block font-semibold mb-2">Post Type</label>
                    <select name="postType" className="border p-2 rounded w-full" defaultValue={item.postType}>
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="block font-semibold mb-2">Thumbnail</label>
                    <input
                        type="text"
                        name="thumbnail"
                        className="border p-2 rounded w-full"
                        defaultValue={item.thumbnail}
                        required
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        className="border p-2 rounded w-full"
                        defaultValue={item.title}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter description"
                        className="border p-2 rounded w-full"
                        rows="2"
                        defaultValue={item.description}
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-2">Category</label>
                    <select name="category" className="border p-2 rounded w-full" defaultValue={item.category}>
                        <option value="Pets">Pets</option>
                        <option value="Documents">Documents</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className="border p-2 rounded w-full"
                        defaultValue={item.location}
                        required
                    />
                </div>

                {/* Date Lost */}
                <div>
                    <label className="block font-semibold mb-2">Date Lost</label>
                    <DatePicker
                        name="dateLost"
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        className="border p-2 rounded w-full"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                {/* Contact Information */}
                <div>
                    <label className="block font-semibold mb-2">Contact Information</label>
                    <input
                        type="text"
                        name="displayName"
                        value={user.displayName}
                        readOnly
                        className="border p-2 rounded w-full bg-gray-100"
                    />
                    <input
                        type="email"
                        name="userEmail"
                        value={user.email}
                        readOnly
                        className="border p-2 rounded w-full bg-gray-100 mt-2"
                    />
                </div>

                {/* Update Button */}
                <div>
                    <button type="submit" className="bg-[#2ecc71] text-white px-6 py-2 rounded hover:bg-[#1ebb9e] transition">
                        Update Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItemsPage;