import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import MainPage from "./pages/MainPage.tsx";
import ContentPage from "./pages/ContentPage.tsx";
import CommentListPage from "./pages/CommentListPage.tsx";
import CommentPage from "./pages/CommentPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import StoragePage from "./pages/StoragePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/contents/:id",
        element: <ContentPage />,
      },
      {
        path: "/contents/:id/comments",
        element: <CommentListPage />,
      },
      {
        path: "/comments/:id",
        element: <CommentPage />,
      },
      {
        path: "users/:id",
        element: <UserPage />,
      },
      {
        path: "users/:id/contents",
        element: <StoragePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
