import { TestType } from "../type";
import { errorHandler } from "./custom";
import { BASE_API_URL } from "./custom";

export async function getTest(): Promise<TestType> {
  return fetch(`${BASE_API_URL}/sample/connection-check`).then(errorHandler);
}
