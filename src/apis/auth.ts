import { errorHandler } from "./custom";
import { BASE_API_URL } from "./custom";

export async function signupRequest() {
  return fetch(`${BASE_API_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "test",
      email: "test",
      password1: "test",
      password2: "test",
    }),
  }).then(errorHandler);
}

// 나중에 제너릭 사용해야 함
export async function loginRequest() {
  return fetch(`${BASE_API_URL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "test",
      password: "test",
    }),
  }).then(errorHandler);
}
