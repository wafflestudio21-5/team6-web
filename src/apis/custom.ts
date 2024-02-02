export function defaultResponseHandler(res: Response) {
  if (!res.ok) {
    console.log(res); //res.json().code=="token_not_valid"
    /*res.json().then((data)=>{
      console.log;
      if(data.code=="token_not_valid"){
        console.log("TOKEN ISSUE!!");
      }else{
        console.log("NOT TOKEN ISSUE");
      }
    })*/
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
