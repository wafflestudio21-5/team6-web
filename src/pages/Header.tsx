import { Outlet, Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>헤더</h1>
        </Link>
        <button>로그인</button>
        <Link to="/users/idididid">
          <button>{"(로그인 했다치고)내프로필"}</button>
        </Link>
      </header>
      <Outlet />
    </div>
  );
}
