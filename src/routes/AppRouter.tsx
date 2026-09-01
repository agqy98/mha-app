import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import HowToUsePage from "../pages/HowToUsePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <MainPage />,
                handle: { title: "Delivery Jobs" }
            },
            // {
            //     path: "jobs",
            //     element: <MainPage />,
            //     handle: { title: "Delivery Jobs" }
            // },
            {
                path: "howtouse",
                element: <HowToUsePage />,
                handle: { title: "" }
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}