import { useLoaderData, useNavigate } from "react-router-dom";
import AboutUs from "../components/AboutUs/AboutUs";
import Banner from "../components/Banner/Banner";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import { useEffect, useState } from "react";
import Testimonials from "../components/Testimonials/Testimonials";
import useTitle from "../hooks/useTitle";

const HomePage = () => {
    
    // for the title
    useTitle('HomePage');

    const navigate = useNavigate();
    const items = useLoaderData();

    const [sortedItems, setSortedItems] = useState([]);

    useEffect(() => {
        const sorted = items
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6); 
        setSortedItems(sorted); 
    }, [items]);


    return (
        <div>

            <Banner></Banner>

            <div>
                <div className="py-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-gray-900 mb-16">
                            Latest Find & Lost Items
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {sortedItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white border"
                                >
                                    {/* Thumbnail */}
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-48 object-cover "
                                    />
                                    <div className="p-6">
                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                        {/* Location */}
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Location:</strong> {item.location}
                                        </p>
                                        {/* Date */}
                                        <p className="text-sm text-gray-600 mb-4">
                                            <strong>Date:</strong>{" "}
                                            {new Date(item.date).toLocaleDateString()}
                                        </p>
                                        {/* View Details Button */}
                                        <button
                                            onClick={() => navigate(`/items/${item._id}`)}
                                            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* See All Button */}
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => navigate("/allItems")}
                                className="px-10 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                            >See All</button>
                        </div>
                    </div>
                </div>
            </div>

            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <AboutUs></AboutUs>
        </div>
    );
};

export default HomePage;