import { useContext, useEffect, useState } from "react";
import { authContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { IoGridOutline } from "react-icons/io5";
import { FaTable } from "react-icons/fa";
import useTitle from "../hooks/useTitle";

const AllRecoveredItemsPage = () => {
    // for the title
    useTitle('All Recovered Items Page');

    const { user } = useContext(authContext);
    const { email } = user;

    const axiosSecure = useAxiosSecure();
    const [receivedItems, setReceivedItems] = useState([]);
    const [isTableLayout, setIsTableLayout] = useState(false);
    const [loading, setLoading] = useState(true); // Start with loading = true

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/addRecoveredItemInfo?email=${email}`)
            .then((res) => {
                setReceivedItems(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after fetch
            });
    }, [email, axiosSecure]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">All Recovered Items</h1>
            <div className="mb-4 flex justify-center gap-4">
                <button
                    onClick={() => setIsTableLayout(true)}
                    className={`px-4 py-2 rounded ${
                        isTableLayout
                            ? "bg-blue-700 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition`}
                >
                    <FaTable size={20} />
                </button>
                <button
                    onClick={() => setIsTableLayout(false)}
                    className={`px-4 py-2 rounded ${
                        !isTableLayout
                            ? "bg-blue-700 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition`}
                >
                    <IoGridOutline size={20} />
                </button>
            </div>

            {loading ? ( // Show spinner while loading
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : receivedItems.length > 0 ? (
                isTableLayout ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Thumbnail</th>
                                    <th className="border border-gray-300 px-4 py-2">Title</th>
                                    <th className="border border-gray-300 px-4 py-2">Recovered Location</th>
                                    <th className="border border-gray-300 px-4 py-2">Recovered Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receivedItems.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.recoveredLocation}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(item.recoveredDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {receivedItems.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded p-4 shadow hover:shadow-lg transition"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-32 object-cover rounded mb-4"
                                />
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-600">{item.recoveredLocation}</p>
                                <p className="text-sm text-gray-600">
                                    {new Date(item.recoveredDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="text-center mt-6">
                    <p className="text-lg text-gray-600">
                        You have not recovered any items yet.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllRecoveredItemsPage;