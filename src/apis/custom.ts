export function defaultResponseHandler(res: Response) {
  if (!res.ok) {
    console.log(res);
    throw new Error(res.status.toString());
  }
  return res.json();
}
export function errorInBodyResponseHandler(res: Response) {
  if (!res.ok) {
    console.log(res); // res.json()에 에러 메시지가 담겨 있음
  }
  return res.json();
}
