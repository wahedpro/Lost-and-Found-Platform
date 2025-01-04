import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { authContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const MyItems = () => {

    // for the title
    useTitle('Manage My Items Page');

    const items = useLoaderData(); // All items loaded from the loader
    const { user } = useContext(authContext); // Current user's email from context
    const { email } = user;

    // Filter items by user's email
    const myItems = items.filter((item) => item.userEmail === email);
    const [itemList, setItemList] = useState(myItems);

    const handleItemDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // delete from the database
                fetch(`https://where-is-it-server-six.vercel.app/addItems/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                            });

                            const remainingItems = itemList.filter((item) => item._id !== id);
                            setItemList(remainingItems);
                        }
                    });
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center mb-8 text-black">My Items</h1>

            {itemList.length === 0 ? (
                <div className="text-center text-gray-500 font-medium">
                    <p>No items available. Add a new item!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-[#6666F2] text-white">
                                <th className="px-6 py-3 text-sm font-medium text-left uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-sm font-medium text-left uppercase tracking-wider">Item Title</th>
                                <th className="px-6 py-3 text-sm font-medium text-left uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-sm font-medium text-left uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-sm font-medium text-left uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {/* Image */}
                                    <td className="px-2 py-4 border-b border-gray-200">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                    </td>
                                    {/* Item Title */}
                                    <td className="px-2 py-4 border-b border-gray-200 font-medium text-gray-800">
                                        {item.title}
                                    </td>
                                    {/* Category */}
                                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600">
                                        {item.category}
                                    </td>
                                    {/* Location */}
                                    <td className="px-2 py-4 border-b border-gray-200 text-gray-600">
                                        {item.location}
                                    </td>
                                    {/* Actions */}
                                    <td className="px-2 py-4 border-b border-gray-200 space-x-2">
                                        <Link to={`/updateItems/${item._id}`}>
                                            <button className="px-4 py-2 bg-[#6666F2] text-white hover:bg-[#4949cc] transition">
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleItemDelete(item._id)}
                                            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyItems;