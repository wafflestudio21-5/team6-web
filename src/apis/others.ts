import { BASE_API_URL } from "./const";

export function getFullRatingCountRequest() {
  return fetch(`${BASE_API_URL}/contents/rates/count`);
}
