import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
    return (
        <div className="flex flex-col border rounded-lg transition-shadow bg-white overflow-hidden">
            {/* Thumbnail Section */}
            <div className="relative">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-52 object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase shadow">
                    {item.postType}
                </span>
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-5 flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <TbCategory size={18} className="text-gray-800" />
                    <span className="ml-2 truncate">{item.category}</span>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                    <IoLocationOutline size={18} className="text-gray-800" />
                    <span className="ml-2 truncate">{item.location}</span>
                </div>

                {/* Button Section */}
                <div className="mt-auto">
                    <Link
                        to={`/Items/${item._id}`}
                        className="block text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold py-2  transition-colors duration-300"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        postType: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default ItemCard;
