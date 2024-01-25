import { SortQueryType } from "../type";
import { BASE_API_URL } from "./const";
import { BASE_API_AUTH_URL } from "./const";

export async function postSignup(
  nickname: string,
  username: string,
  password1: string,
  password2: string
) {
  return fetch(`${BASE_API_AUTH_URL}/auth/token/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, username, password1, password2 }),
  });
}

export async function postLogin(username: string, password: string) {
  return fetch(`${BASE_API_AUTH_URL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

export async function getMyUserData(accessToken: string) {
  return fetch(`${BASE_API_AUTH_URL}/users/mypage/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 리프레시 토큰 및 엑세스 토큰을 갱신. 자동로그인을 위해 사용
export async function postNewToken() {
  return fetch(`${BASE_API_AUTH_URL}/auth/token/refresh/new/`, {
    method: "POST",
    credentials: "include",
  });
}

export async function postLogout() {
  return fetch(`${BASE_API_AUTH_URL}/auth/token/logout/`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getKakaoAutoCallback(code: string | null) {
  return fetch(`${BASE_API_AUTH_URL}/auth/kakao/login?code=${code}`);
}

// 카카오 회원탈퇴 기능이 구현되어 있는 엔드포인트이나, 기본 탈퇴 기능도 구현되어 있어서 이 api만 사용
export async function deleteWithDrawalUser(accessToken: string) {
  return fetch(`${BASE_API_AUTH_URL}/users/mypage/delete/kakao_unlink/`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getMyLikesComments(
  accessToken: string,
  query?: SortQueryType
) {
  if (!query) {
    return fetch(
      `${BASE_API_URL}/users/mypage/likes/comments/?order=${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  return fetch(`${BASE_API_URL}/users/mypage/likes/comments/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getNextMyLikesComments(
  accessToken: string,
  nextUrl: string
) {
  return fetch(nextUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
