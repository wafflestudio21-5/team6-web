import styles from "./SearchBar.module.scss";
import searchSmall from "../assets/searchSmall.svg";
import searchBig from "../assets/searchBig.svg";
import { useNavigate } from "react-router";

export default function SearchBar({
  transparent,
  searchInput,
  setSearchInput,
}: {
  transparent: boolean;
  searchInput: string;
  setSearchInput: (newSearchInput: string) => void;
}) {
  const navigate = useNavigate();

  const searchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput) {
      navigate("/search?query=" + searchInput);
    }
  };

  return (
    <li
      className={
        styles.searchBar + (transparent ? " " + styles.transparent : "")
      }
    >
      <div>
        <div>
          <label>
            <img
              className={transparent ? styles.searchBig : styles.searchSmall}
              src={transparent ? searchBig : searchSmall}
            />
            <input
              autoComplete="off"
              placeholder="콘텐츠, 인물, 유저를 검색해보세요."
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onKeyDown={searchKeyDown}
            />
          </label>
        </div>
      </div>
      <div className={styles.recommend}></div>
    </li>
  );
}
