import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-5">
            <div className="container mx-auto px-6 md:px-12 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">WhereIsIt</h2>
                    <p className="text-sm">
                        A platform connecting individuals who have lost personal belongings with those who may have found them.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms Of Service</a></li>
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white"><FaFacebook size={24} /></a>
                        <a href="#" className="hover:text-white"><FaTwitter size={24} /></a>
                        <a href="#" className="hover:text-white"><FaInstagram size={24} /></a>
                        <a href="#" className="hover:text-white"><FaYoutube size={24} /></a>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                    <p className="text-sm mb-4">Subscribe to our newsletter for updates.</p>
                    <form className="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full py-2 px-3 rounded bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} WhereIsIt. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;