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
import UserStoragePage from "./pages/UserStoragePage.tsx";
import UserLikesPage from "./pages/UserLikesPage.tsx";
import UserRatingsPage from "./pages/UserRatingsPage.tsx";
import UserCommentsPage from "./pages/UserCommentsPage.tsx";
import UserFollowersPage from "./pages/UserFollowersPage.tsx";
import UserFollowingsPage from "./pages/UserFollowingsPage.tsx";
import AuthCallBackKakaoPage from "./pages/AuthCallBackKakaoPage.tsx";

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
        path: "users/:id/followers", // 유저가 남긴 평가 모음 페이지
        element: <UserFollowersPage />,
      },
      {
        path: "users/:id/followings", // 유저가 남긴 평가 모음 페이지
        element: <UserFollowingsPage />,
      },
      {
        path: "users/:id/ratings", // 유저가 남긴 평가 모음 페이지
        element: <UserRatingsPage />,
      },
      {
        path: "users/:id/comments", // 유저가 남긴 코멘트 모음 페이지
        element: <UserCommentsPage />,
      },
      {
        path: "users/:id/contents", // 보관함 페이지
        element: <UserStoragePage />,
      },

      {
        path: "users/:id/likes", // user가 영화에 대해 좋아요 남겼을 때의 페이지
        element: <UserLikesPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      { path: "/auth/callback/kakao", element: <AuthCallBackKakaoPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
