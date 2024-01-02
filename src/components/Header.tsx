import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CurrentModalType } from "../pages/Layout";

type HeaderProps = {
  setCurrentModal: (modal: CurrentModalType) => void;
};

export default function Header({ setCurrentModal }: HeaderProps) {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const query = searchParams.get("query");

  const [searchText, setSearchText] = useState(query ? query : "");

  // useEffect(() => {
  //   setSearchText(query ? query : "");
  // }, [query]);

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchText) {
      navigate("/search?query=" + searchText);
    }
  };

  return (
    <div>
      <header>
        <Link to="/">
          <h1>헤더</h1>
        </Link>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={searchKeyDown}
        />
        <button
          onClick={() => {
            setCurrentModal("login");
          }}
        >
          로그인
        </button>
        <Link to="/users/idididid">
          <button>{"(로그인 했다치고)내프로필"}</button>
        </Link>
      </header>
    </div>
  );
}
