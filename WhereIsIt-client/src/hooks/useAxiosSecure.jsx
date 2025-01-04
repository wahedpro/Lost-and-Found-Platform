import axios from "axios";
import { useContext, useEffect } from "react";
import { authContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'https://where-is-it-server-six.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {

    const { logoutUser } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                logoutUser()
                    .then(() => {
                        // redirect to the login page
                        navigate('/login')
                    })
                    .catch(err => console.log(err))
            }
            return Promise.reject(error);
        })
    }, [logoutUser, navigate])

    return axiosInstance;
};

export default useAxiosSecure;