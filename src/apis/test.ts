import { BASE_API_URL } from "./custom";

export async function getTest() {
  return fetch(`${BASE_API_URL}/sample/connection-check`).then();
}

/*
fetch(
  "https://wafflepedia-env.eba-wjpwvtcu.ap-northeast-2.elasticbeanstalk.com/sample/connection-check",
)
  .then((res) => res.json())
  .then((d) => {
    console.log(d);
  })
  .catch((e) => {
    console.log(e);
  });
*/
