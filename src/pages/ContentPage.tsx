import { Link, useParams } from "react-router-dom";

export default function ContentPage() {
  const { id } = useParams();
  //div의 style은 그냥 잘 보이라고 넣은 것
  return (
    <div style={{ backgroundColor: "blueviolet" }}>
      <h1>영화 정보 페이지</h1>
      <Link to={"/contents/" + id + "/comments"}>
        <button>리뷰 목록 보기</button>
      </Link>
      <br />
      <Link to={"/comments/idididid"}>
        <button>단일 리뷰 보기</button>
      </Link>
    </div>
  );
}
