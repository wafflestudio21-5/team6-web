import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link to="/contents/idididid">
        <h2>영화상세보기</h2>
      </Link>
    </div>
  );
}
