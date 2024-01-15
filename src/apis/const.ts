export const BASE_API_URL = "https://wafflepedia.xyz";
// this should be changed in deployment version (to /api/*)

export const REST_API_KEY = "e31be69d59422c639fcdd73e2f80ce5d";

export const REDIRECT_URI = "https://localhost:5173/auth/callback/kakao";
// this should be changed in deployment version (to /auth/callback/kakao)
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// 위 변수들은 ENV로 추후 관리됩니다.
