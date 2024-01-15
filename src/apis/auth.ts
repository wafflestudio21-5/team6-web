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

// get access token && refresh token
export async function loginRequest() {
  return fetch(`${BASE_API_URL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "sh020119",
      password: "dhtngus1!1!",
    }),
    //  credentials: "include",
  });
}

export async function logoutRequest() {}
