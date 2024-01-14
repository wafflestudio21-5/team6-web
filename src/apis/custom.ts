export const BASE_API_URL = "https://wafflepedia.xyz";

export function errorHandler(res: Response) {
  if (!res.ok) {
    console.log(res);
    throw new Error(`error status: ${res.status}`);
  }
  return res.json();
}
