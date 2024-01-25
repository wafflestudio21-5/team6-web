import { BASE_API_URL } from "./const";


export async function getCommentListRequest(
  movieCD: string,
  sortQuery?: string
) {
  if (!sortQuery) return fetch(`${BASE_API_URL}/contents/${movieCD}/comments`);
  return fetch(
    `${BASE_API_URL}/contents/${movieCD}/comments/?order=${sortQuery}`
  );

}

export async function createCommentRequest(
  movieCD: string,
  accessToken: string,
  content: string,
  has_spoiler: boolean
) {
  return fetch(`${BASE_API_URL}/contents/${movieCD}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      content,
      has_spoiler: has_spoiler,
    }),
  });
}

//특정 코멘트 아이디의 코멘트를 알 수 있다.
export async function getCommentRequest(
  commentId: number,
  accessToken?: string
) {
  if (!accessToken) return fetch(`${BASE_API_URL}/comments/${commentId}`);
  return fetch(`${BASE_API_URL}/comments/${commentId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export async function updateCommentRequest(
  commentId: number,
  accessToken: string,
  content: string,
  hasSpoiler: boolean
) {
  return fetch(`${BASE_API_URL}/comments/${commentId}`, {
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

export async function getCommentReplies(
  commentId: number,
  accessToken?: string
) {
  if (!accessToken)
    return fetch(`${BASE_API_URL}/comments/${commentId}/replies/`);

  return fetch(`${BASE_API_URL}/comments/${commentId}/replies/`, {

    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}
export async function getNextCommentReplies(
  nextUrl: string,
  accessToken?: string
) {
  if (!accessToken) return fetch(nextUrl);
  return fetch(nextUrl, {

    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}



export async function postCreateReply(
  commentId: number,
  accessToken: string,
  content: string
) {
  return fetch(`${BASE_API_URL}/comments/${commentId}/replies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      content,
    }),
  });
}
export async function putUpdateReply(
  reply_id: number,
  accessToken: string,
  content: string
) {
  return fetch(`${BASE_API_URL}/comments/replies/${reply_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      content,
    }),
  });
}
export async function deleteReply(reply_id: number, accessToken: string) {
  return fetch(`${BASE_API_URL}/comments/replies/${reply_id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export async function postToggleReplyLike(
  replyId: number,
  accessToken: string
) {
  return fetch(`${BASE_API_URL}/comments/replies/${replyId}/like`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export async function postToggleCommentLike(
  comment_id: number,
  accessToken: string
) {
  return fetch(`${BASE_API_URL}/comments/${comment_id}/like`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}
