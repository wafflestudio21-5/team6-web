import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import MainPage from "./pages/MainPage.tsx";
import ContentPage from "./pages/ContentPage.tsx";
import CommentListPage from "./pages/CommentListPage.tsx";
import CommentPage from "./pages/CommentPage.tsx";
import UserPage from "./pages/user/UserPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import UserStoragePage from "./pages/user/UserStoragePage.tsx";
import UserLikesPage from "./pages/user/UserLikesCommentListPage.tsx";
import UserRatingsPage from "./pages/user/UserRatingsPage.tsx";
import UserMovieListByRatingValuePage from "./pages/user/UserMovieListByRatingValuePage.tsx";
import UserWrittenCommentListPage from "./pages/user/UserWrittenCommentListPage.tsx";
import UserFollowingPage from "./pages/user/UserFollowingPage.tsx";
import AuthCallBackKakaoPage from "./pages/AuthCallBackKakaoPage.tsx";
import { AuthContextProvider } from "./contexts/authContext.tsx";
import UserStorageSubPage from "./pages/user/UserStorageSubPage.tsx";
import UserFollowerPage from "./pages/user/UserFollowerPage.tsx";
import AuthToKaKao from "./pages/AuthToKakao.tsx";
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
        element: <UserFollowerPage />,
      },
      {
        path: "users/:id/followings", // 유저가 남긴 평가 모음 페이지
        element: <UserFollowingPage />,
      },
      {
        path: "users/:id/ratings", // 유저가 남긴 평가 모음 페이지
        element: <UserRatingsPage />,
      },
      {
        path: "users/:id/ratings/:ratingNumber", // 유저가 남긴 평가 모음 페이지
        element: <UserMovieListByRatingValuePage />,
      },
      {
        path: "users/:id/comments", // 유저가 남긴 코멘트 모음 페이지
        element: <UserWrittenCommentListPage />,
      },
      {
        path: "users/:id/contents", // 보관함 페이지
        element: <UserStoragePage />,
      },
      {
        path: "users/:id/contents/:subpage",
        element: <UserStorageSubPage />,
      },
      {
        path: "users/:id/likes", // user가 영화에 대해 좋아요 남겼을 때의 페이지
        element: <UserLikesPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
  { path: "/auth/callback/kakao", element: <AuthCallBackKakaoPage /> },
  { path: "/auth/toKakao", element: <AuthToKaKao /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>,
);
