import { errorHandler } from "./custom";
import { BASE_URL } from "./custom";
import { BoxOfficeListType } from "./type";

export async function getBoxofficeList(): Promise<BoxOfficeListType> {
  return fetch(`${BASE_URL}/boxoffice`).then(errorHandler);
}
