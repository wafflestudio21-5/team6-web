import { BASE_API_URL } from "./custom";

const testInfo1 = {
  username: "sh020119",
  password1: "dhtngus1!1!",
  password2: "dhtngus1!1!",
};
/*
const testInfo2 = {
  username: "오수현",
  password1: "suhyeon1234!4",
  password2: "suhyeon1234!4",
};*/

export async function signupRequest() {
  const jsondata = JSON.stringify(testInfo1);

  return fetch(`${BASE_API_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //  "Content-Type": "application/x-www-form-urlencoded",
    },
    body: jsondata,
  }).then();
}

export async function naverLoginRequest() {
  return fetch(`${BASE_API_URL}/auth/naver/login/`, {
    method: "GET",
  }).then((res) => console.log(res));
}

// 나중에 제너릭 사용해야 함
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
  }).then();
}
