import { motion } from "framer-motion";

const AboutUs = () => {
    return (
        <motion.div
            className="about-section bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6 md:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            <div className="flex flex-col md:flex-row items-center md:justify-between">
                {/* Image Section */}
                <motion.div
                    className="relative w-full md:w-1/2"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.img
                        src="https://i.ibb.co.com/DKnLtVb/wahedpro.jpg"
                        alt="Product"
                        className="rounded-lg shadow-lg"
                        whileHover={{
                            scale: 1.05,
                            rotate: 2,
                            transition: { duration: 0.5 },
                        }}
                    />
                    {/* Monthly Members Badge */}
                    <motion.div
                        className="absolute top-4 left-4 bg-white px-4 py-2 shadow-lg rounded text-gray-800"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    >
                        <p className="font-bold text-lg">5000+</p>
                        <p className="text-sm">Monthly Members</p>
                    </motion.div>
                    {/* Reviews Badge */}
                    <motion.div
                        className="absolute bottom-4 right-4 bg-white px-4 py-2 shadow-lg rounded text-gray-800"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.7,
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    >
                        <p className="font-bold text-lg">8000+ Reviews</p>
                    </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    className="mt-8 md:mt-0 md:ml-12 md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.h2
                        className="text-4xl font-bold mb-4 text-blue-600"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.3,
                        }}
                    >
                        About Us
                    </motion.h2>
                    <motion.p
                        className="text-gray-700 leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.5,
                        }}
                    >
                        Welcome to WhereIsIt, your trusted Lost and Found platform. We connect individuals who have lost personal belongings with those who have found them. Our mission is to reunite you with your precious items through a seamless, secure, and efficient platform. Whether it is gadgets, documents, or sentimental treasures, FindItNow makes recovery easier than ever.
                    </motion.p>
                    <motion.button
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded shadow-lg hover:shadow-xl transition"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.7)",
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutUs;