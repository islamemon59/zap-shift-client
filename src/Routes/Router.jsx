import { createBrowserRouter } from "react-router";
import MainLayout from "./Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "./Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            }
        ]
    }
])