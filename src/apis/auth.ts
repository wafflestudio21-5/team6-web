import { errorHandler } from "./custom";
import { BASE_URL } from "./custom";
export async function signupRequest(
  nickname: string,
  loginId: string,
  password: string,
) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({
      nickname,
      loginId,
      password,
    }),
  }).then(errorHandler);
}

// 나중에 제너릭 사용해야 함
export async function loginRequest(loginId: string, password: string) {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ loginId, password }),
  }).then(errorHandler);
}
