const Testimonials = () => {
    const testimonials = [
        {
            name: "Alexa Rodríguez",
            role: "Student",
            image: "https://i.ibb.co.com/pn13Rpb/3.jpg",
            review:
                "A life-changing experience! This platform helped me find my lost items effortlessly.",
            rating: 5,
        },
        {
            name: "Emily Chen",
            role: "Web Designer",
            image: "https://i.ibb.co.com/0sdCLy9/2.jpg",
            review:
                "Such a great platform! It connected me with the person who found my lost item in no time.",
            rating: 5,
        },
        {
            name: "James Johnson",
            role: "Business Analyst",
            image: "https://i.ibb.co.com/5BDKYRc/1.jpg",
            review:
                "I found a lost item I thought was gone forever! This platform truly connects people.",
            rating: 5,
        },
    ];

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 py-10 px-6">
            <h2 className="text-center text-white text-3xl font-semibold mb-4">
                What Our Users Are Saying
            </h2>
            <p className="text-center text-white text-lg mb-12 max-w-3xl mx-auto">
                Hear real stories from our users about how our platform has helped them reconnect with their lost belongings.
            </p>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg p-8 shadow-xl transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="flex justify-center mb-6">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
                        </div>
                        <div className="flex justify-center mb-4">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-yellow-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927a1 1 0 011.902 0l1.18 3.641a1 1 0 00.95.69h3.641a1 1 0 01.593 1.81l-2.943 2.14a1 1 0 00-.364 1.118l1.18 3.641a1 1 0 01-1.54 1.118l-2.943-2.14a1 1 0 00-1.175 0l-2.943 2.14a1 1 0 01-1.54-1.118l1.18-3.641a1 1 0 00-.364-1.118L2.685 9.068a1 1 0 01.593-1.81h3.641a1 1 0 00.95-.69L9.049 2.927z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-600 text-base text-center">{testimonial.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
