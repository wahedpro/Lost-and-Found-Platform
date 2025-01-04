import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AddItemsPage from "../pages/AddItemsPage";
import ManageMyItemsPage from "../pages/ManageMyItemsPage";
import AllRecoveredItemsPage from "../pages/AllRecoveredItemsPage";
import LostAndFoundItemsPage from "../pages/LostAndFoundItemsPage";
import UpdateItemsPage from "../pages/UpdateItemsPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>,
                loader: ()=> fetch('https://where-is-it-server-six.vercel.app/addItems')
            },
            {
                path: "register",
                element: <RegisterPage></RegisterPage>
            },
            {
                path: "login",
                element : <LoginPage></LoginPage>
            },
            {
                path: "allItems",
                element: <LostAndFoundItemsPage></LostAndFoundItemsPage>,
            },
            {
                path: 'Items/:id',
                element: <PrivateRoute><PostDetailsPage></PostDetailsPage></PrivateRoute>,
                loader: ({params})=>fetch(`https://where-is-it-server-six.vercel.app/itemDetails/${params.id}`),
            },
            {
                path: "addItems",
                element : <PrivateRoute><AddItemsPage></AddItemsPage></PrivateRoute>
            },
            {
                path: "myItems",
                element : <PrivateRoute><ManageMyItemsPage></ManageMyItemsPage></PrivateRoute>,
                loader: ()=> fetch('https://where-is-it-server-six.vercel.app/addItems')
            },
            {
                path: 'updateItems/:id',
                element: <PrivateRoute><UpdateItemsPage></UpdateItemsPage></PrivateRoute>,
            },
            {
                path: "allRecovered",
                element : <PrivateRoute><AllRecoveredItemsPage></AllRecoveredItemsPage></PrivateRoute>,
            },
            {
                path: '*',
                element: <ErrorPage></ErrorPage>
            }
        ]
    },
]);

export default router;