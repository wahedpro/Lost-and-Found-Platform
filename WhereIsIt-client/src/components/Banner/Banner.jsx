import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Banner = () => {
    return (
        <div className="py-5 max-w-full">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="relative"
            >
                <SwiperSlide>
                    <div className="relative">
                        <img
                            className="w-full h-96 object-cover  shadow-lg"
                            src="https://i.ibb.co.com/BKSBc8Z/1.png"
                            alt="Slide 1"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 ">
                            <div className="text-center px-4 md:px-6 opacity-90">
                                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                                    Welcome to Our Platform
                                </h2>
                                <p className="text-white text-lg sm:text-xl md:text-2xl italic">
                                    "The journey of a thousand miles begins with one step."
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img
                            className="w-full h-96 object-cover  shadow-lg"
                            src="https://i.ibb.co.com/cc7QRws/2.png"
                            alt="Slide 2"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 ">
                            <div className="text-center px-4 md:px-6 opacity-90">
                                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                                    Find What You Lost
                                </h2>
                                <p className="text-white text-lg sm:text-xl md:text-2xl italic">
                                    "What is lost may not always be found, but hope is never lost."
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img
                            className="w-full h-96 object-cover  shadow-lg"
                            src="https://i.ibb.co.com/HTVX9hb/3.png"
                            alt="Slide 3"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 ">
                            <div className="text-center px-4 md:px-6 opacity-90">
                                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                                    Helping You Connect
                                </h2>
                                <p className="text-white text-lg sm:text-xl md:text-2xl italic">
                                    "Alone we can do so little; together we can do so much."
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;