import { BASE_API_URL } from "./const";

// 아직 영화리스트가 없어서 받아보기 어려움
// type은 추후에 enum으로 수정

// 나중에 바꾸기
export async function getContentListRequest(
  order: string,
  accessToken?: string
) {
  const headers: HeadersInit = accessToken
    ? {
        Authorization: "Bearer " + accessToken,
      }
    : {};

  if (order === "box-office")
    return fetch(`${BASE_API_URL}/contentTest/movies/boxoffice/update/`, {
      method: "GET",
      headers: headers,
    });

  return fetch(`${BASE_API_URL}/contents?order=${order}`, {
    method: "GET",
    headers: headers,
  });
}

export async function getContentRequest(movieCD: string, accessToken?: string) {
  if (!accessToken) return fetch(`${BASE_API_URL}/contents/${movieCD}`);
  return fetch(`${BASE_API_URL}/contents/${movieCD}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export async function createRatingRequest(
  movieCD: string,
  rate: number,
  accessToken: string
) {
  return fetch(`${BASE_API_URL}/contents/${movieCD}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      rate: rate.toFixed(1),
    }),
  });
}

export async function updateRatingRequest(
  rateId: number,
  rate: number,
  accessToken: string
) {
  return fetch(`${BASE_API_URL}/contents/rates/${rateId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
    body: JSON.stringify({
      rate: rate.toFixed(1),
    }),
  });
}

export async function deleteRatingRequest(rateId: number, accessToken: string) {
  return fetch(`${BASE_API_URL}/contents/rates/${rateId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  });
}

export async function getRatesCount() {
  return fetch(`${BASE_API_URL}/contents/rates/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
