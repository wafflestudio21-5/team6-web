import { BASE_API_URL } from "./const";

export async function userProfileRequest(id: number) {
  return fetch(`${BASE_API_URL}/users/${id}/`);
}

export async function followingsRequest(id: number) {
  return fetch(`${BASE_API_URL}/users/${id}/followings/`);
}
export async function followersRequest(id: number) {
  return fetch(`${BASE_API_URL}/users/${id}/followers/`);
}
