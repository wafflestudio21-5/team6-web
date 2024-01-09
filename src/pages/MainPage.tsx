import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieType, TestType } from "../type";
import { getTest } from "../apis/test";

export default function MainPage() {
  const [testData, setTestData] = useState<TestType | null>(null);

  useEffect(() => {
    getTest()
      .then((data) => {
        setTestData(data);
        console.log(data);
      })
      .catch(() => {
        alert("데이터를 불러오는데 실패했습니다.");
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
