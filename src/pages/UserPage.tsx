import { Link } from "react-router-dom";

export default function UserPage() {
  return (
    <div>
      <h1>유저 정보 페이지</h1>
      <Link to={"contents"}>
        <button>보관함</button>
      </Link>
    </div>
  );
}
