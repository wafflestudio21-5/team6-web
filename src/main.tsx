import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./pages/Header.tsx";
import MainPage from "./pages/MainPage.tsx";
import ContentsPage from "./pages/ContentsPage.tsx";
import ContentsCommentsPage from "./pages/ContentsCommentsPage.tsx";
import CommentsPage from "./pages/CommentsPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
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
        element: <ContentsPage />,
      },
      {
        path: "/contents/:id/comments",
        element: <ContentsCommentsPage />,
      },
      {
        path: "/comments/:id",
        element: <CommentsPage />,
      },
      {
        path: "users/:id",
        element: <UsersPage />,
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
