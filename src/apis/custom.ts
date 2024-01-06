export const BASE_URL = "http://example.com/api";

export function errorHandler(res: Response) {
  if (!res.ok) {
    throw new Error(`error status: ${res.status}`);
  }
  return res.json();
}
