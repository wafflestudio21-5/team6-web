import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./pages/Header.tsx";
import MainPage from "./pages/MainPage.tsx";
import ContentPage from "./pages/ContentPage.tsx";
import CommentListPage from "./pages/CommentListPage.tsx";
import CommentPage from "./pages/CommentPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
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
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
