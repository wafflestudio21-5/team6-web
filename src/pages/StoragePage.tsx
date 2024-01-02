import { Link, useParams } from "react-router-dom";

export default function StoragePage() {
  const { id } = useParams();

  return (
    <div>
      <Link to={"/users/" + id}>
        <button>돌아가기</button>
      </Link>
      <h1>보관함</h1>
    </div>
  );
}
