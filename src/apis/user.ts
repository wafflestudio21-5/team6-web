// 모두가 접근 가능한 유저페이지에 대한 api
import { BASE_API_URL } from "./const";

export async function getUserDetail(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/`);
}

export async function getFollowingList(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/followings/`);
}
export async function getFollowerList(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/followers/`);
}

export async function postAddFollow(accessToken: string, userId: number) {
  return fetch(`${BASE_API_URL}/users/add/follow/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });
}

// url 노션에서 형식 확인하고 추후 변경
export async function postUnFollow(accessToken: string, userId: number) {
  return fetch(`${BASE_API_URL}/users/unfollow/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });
}

export async function getUserWrittenComments(
  userId: number,
  query?: "like" | "created" | "high-rating" | "low-rating",
) {
  if (!query) {
    return fetch(`${BASE_API_URL}/users/${userId}/comments/`);
  }

  return fetch(`${BASE_API_URL}/users/${userId}/comments/?order=${query}`);
}

export async function getUserRatingMovies(
  userId: number,
  query: {
    order?: "high-rating" | "low-rating" | "created";
    rate?: number;
  },
) {
  const result = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return fetch(`${BASE_API_URL}/users/${userId}/ratings?${result}`);
}
export async function getUserWatchings(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/movies/watching/`);
}
export async function getUserWantToWatch(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/movies/want_to_watch/`);
}

export async function postCreateWatchingState(
  movieCD: string,
  accessToken: string,
  user_state: "watching" | "want_to_watch" | "not_interested" | null,
) {
  return fetch(`${BASE_API_URL}/contents/${movieCD}/state`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      user_state,
    }),
  });
}

export async function putUpdateWatchingState(
  state_id: number,
  accessToken: string,
  user_state: "watching" | "want_to_watch" | "not_interested" | null,
) {
  return fetch(`${BASE_API_URL}/contents/states/${state_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      user_state,
    }),
  });
}

export async function deleteWatchingState(
  state_id: number,
  accessToken: string
) {
  return fetch(`${BASE_API_URL}/contents/states/${state_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
