import { BASE_API_URL } from "./const";

export async function signupRequest(
  nickname: string,
  username: string,
  password1: string,
  password2: string,
) {
  return fetch(`${BASE_API_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname, username, password1, password2 }),
  });
}

export async function loginRequest(username: string, password: string) {
  return fetch(`${BASE_API_URL}/auth/token/`, {
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

export async function myUserDataRequest(accessToken: string) {
  return fetch(`${BASE_API_URL}/users/mypage/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 리프레시 토큰 및 엑세스 토큰을 갱신. 자동로그인을 위해 사용
export async function newTokenRequest() {
  return fetch(`${BASE_API_URL}/auth/token/refresh/new/`, {
    method: "POST",
    credentials: "include",
  });
}

export async function logoutRequest() {
  return fetch(`${BASE_API_URL}/auth/token/logout/`, {
    method: "POST",
    credentials: "include",
  });
}

// 프론트 단에서는 엑세스 토큰을 삭제...
export async function kakaoLogoutRequest() {
  //
}
