import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CommentListPage() {
  const { id } = useParams();
  return (
    <div>
      <Link to={"/contents/" + id}>
        <button>돌아가기</button>
      </Link>
      <h1>코멘트 목록 페이지</h1>
    </div>
  );
}
