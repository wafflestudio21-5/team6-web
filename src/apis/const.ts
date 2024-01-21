export const BASE_API_URL = "https://wafflepedia.xyz/api"; //기본 crud는 여기로 보낸다
export const BASE_API_AUTH_URL = "https://d1vexdz72u651e.cloudfront.net/api"; // 쿠키를 이용하는 경우에는 여기로 보낸다

console.log("BASE_API_URL : ", BASE_API_URL);

export const REST_API_KEY = "e31be69d59422c639fcdd73e2f80ce5d";

export const REDIRECT_URI =
  "https://d1vexdz72u651e.cloudfront.net/auth/callback/kakao";
// this should be changed in deployment version (to /auth/callback/kakao)

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
