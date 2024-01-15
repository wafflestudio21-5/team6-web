import { BASE_API_URL } from "./const";

export async function getTest() {
  return fetch(`${BASE_API_URL}/sample/connection-check`).then();
}
