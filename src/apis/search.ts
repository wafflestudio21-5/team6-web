import { BASE_API_URL } from "./const";

export async function getKeywordSearch(query: string) {
  return fetch(`${BASE_API_URL}/search/keyword?query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
