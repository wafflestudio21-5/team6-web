import { BASE_API_URL } from "./const";

export async function getKeywordSearch(query: string) {
  return fetch(`${BASE_API_URL}/search/keyword?query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getSearch(query: string, category: string, page: number) {
  return fetch(
    `${BASE_API_URL}/search?query=${query}&category=${category}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
