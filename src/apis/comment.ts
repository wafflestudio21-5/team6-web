import { BASE_API_URL } from "./const";

// 아직 영화리스트가 없어서 받아보기 어려움
// type은 추후에 enum으로 수정
export async function getCommentListRequest(movieCD: string) {
  return fetch(`${BASE_API_URL}/contents/${movieCD}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function createCommentRequest(
  movieCD: string,
  accessToken: string,
  content: string,
  hasSpoiler: boolean
) {
  return fetch(`${BASE_API_URL}/contents/${movieCD}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      content,
      has_spoiler: hasSpoiler,
    }),
  });
}

export async function getCommentRequest(id: number) {
  return fetch(`${BASE_API_URL}/comments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export async function updateCommentRequest(
  id: number,
  accessToken: string,
  content: string,
  hasSpoiler: boolean
) {
  return fetch(`${BASE_API_URL}/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
    body: JSON.stringify({
      content,
      has_spoiler: hasSpoiler,
    }),
  });
}

export async function deleteCommentRequest(id: number, accessToken: string) {
  return fetch(`${BASE_API_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  });
}
