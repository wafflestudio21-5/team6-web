import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoxofficeList } from "../apis/home";
import { MovieType } from "../type";
export default function MainPage() {
  const [boxOfficeList, setBoxofficeList] = useState<MovieType[] | null>(null);

  useEffect(() => {
    getBoxofficeList()
      .then((data) => {
        setBoxofficeList(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div>
      <h1>메인 페이지</h1>
      <Link to="/contents/idididid">
        <h2>영화상세보기</h2>
      </Link>
    </div>
  );
}
