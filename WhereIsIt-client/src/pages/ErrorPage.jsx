import { NavLink } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const ErrorPage = () => {

    useTitle('Error Page');

    return (
        <div className="flex flex-col items-center justify-center py-28">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Page Not Found</h1>
            <NavLink to="/" className="text-blue-600 hover:underline text-lg" > Back To Home Page </NavLink>
        </div>
    );
};

export default ErrorPage;
