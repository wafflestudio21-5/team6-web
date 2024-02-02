export function defaultResponseHandler(res: Response) {
  if (!res.ok) {
    console.log(res);
    throw new Error(res.status.toString());
  }
  return res.json();
}
export function errorInBodyResponseHandler(res: Response) {
  if (!res.ok) {
  }
  return res.json();
}
