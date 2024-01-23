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
export async function deleteFollow(accessToken: string, id: number) {
  return fetch(`${BASE_API_URL}/users/delete/follow/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: id }),
  });
}

// 노션에는 mypage로 되어있는데 확인하고 요청하기
export async function getUserLikesComments(id: number) {
  return fetch(`${BASE_API_URL}/users/${id}/likes/comments/`);
}

export async function getUserWrittenComments(
  userId: number,
  query?: "like" | "created" | "high-rating" | "low-rating"
) {
  if (query === undefined) {
    return fetch(`${BASE_API_URL}/users/${userId}/comments/`);
  }

  return fetch(`${BASE_API_URL}/users/${userId}/comments/?order=${query}`);
}

export async function getUserRatings(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/ratings/`);
}
export async function getUserDoings(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/movies/watching/`);
}
export async function getUserWishes(userId: number) {
  return fetch(`${BASE_API_URL}/users/${userId}/movies/want_to_watch/`);
}

/*
credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },


*/
