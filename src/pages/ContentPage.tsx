import { Link, useParams } from "react-router-dom";

export default function ContentPage() {
  const { id } = useParams();
  return (
    <div>
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
