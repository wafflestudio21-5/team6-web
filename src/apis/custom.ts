export function defaultResponseHandler(res: Response) {
  if (!res.ok) {
    console.log(res);
    throw new Error(res.status.toString());
  }
  return res.json();
}
