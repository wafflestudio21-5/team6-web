import { errorHandler } from "./custom";
import { BASE_API_URL } from "./custom";
import { MovieType } from "../type";
export async function getBoxofficeList(): Promise<MovieType[]> {
  return fetch(`${BASE_API_URL}/boxoffice`).then(errorHandler);
}
