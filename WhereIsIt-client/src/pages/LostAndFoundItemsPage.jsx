import ItemCard from "../components/ItemCard/ItemCard";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import useTitle from "../hooks/useTitle";

const LostAndFoundItemsPage = () => {

    // for the title
    useTitle('Lost And Found Items Page');

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);  // Track the current page
    const [totalItems, setTotalItems] = useState(0); // Track total number of items for pagination
    const itemsPerPage = 6;  // Number of items per page

    const [loading, setLoading] = useState(false);

    // Fetch items based on search and pagination
    useEffect(() => {
        setLoading(true);
        const fetchAllItems = async () => {
            const { data } = await axios.get(`https://where-is-it-server-six.vercel.app/allItems?search=${search}&page=${page}&limit=${itemsPerPage}`);
            setItems(data.items); 
            setTotalItems(data.total);
            setLoading(false);
        };
        fetchAllItems();
    }, [search, page]);

    // Handle pagination button click
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= Math.ceil(totalItems / itemsPerPage)) {
            setPage(newPage);
        }
    };

    return (
        <div>
            {/* Search Controls */}
            <div className="flex w-[90%] lg:w-[60%] mx-auto items-center relative pt-5">
                <input
                    type="text"
                    placeholder={`Search by title or location`}
                    onBlur={e => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6666F2]"
                />
                <button className="bg-[#6666F2] px-3 py-2 text-white rounded-md absolute right-1 sm:right-1">
                    <IoMdSearch size={20} />
                </button>
            </div>

            {/* Show products */}
            
            {loading ? ( // Show spinner when loading
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : (
            <div className="w-[95%] mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <ItemCard key={index} item={item} />
                ))}
            </div>
                )
            }
            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 py-5">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="flex items-center text-lg">{page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page * itemsPerPage >= totalItems}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LostAndFoundItemsPage;
