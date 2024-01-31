import { Link } from "react-router-dom";
import styles from "./SearchUserList.module.scss";
import UserDefault from "../assets/user_default.jpg";

const rate_comment = (user: SearchUserType) => {
  if(user.bio)return user.bio;
  if (user.rate_num) {
    if (user.comment_num) {
      return `평가 ${user.rate_num} • 코멘트 ${user.comment_num}`;
    } else {
      return `평가 ${user.rate_num}`;
    }
  } else {
    if (user.comment_num) {
      return `코멘트 ${user.comment_num}`;
    } else {
      return "";
    }
  }
};

export type SearchUserType = {
  id: number;
  nickname: string;
  bio: string;
  profile_photo: string;
  rate_num: number;
  comment_num: number;
};

export default function SearchUserList({
  contents,
}: {
  contents: SearchUserType[];
}) {
  return (
    <div className={styles.searchListContainer}>
      <ul className={styles.searchList}>
        {contents.map((user: SearchUserType) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              <div className={styles.userImage}>
                <img
                  alt={user.nickname + "의 사진"}
                  src={user.profile_photo ?? UserDefault}
                />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userContainer}>
                  <div className={styles.userName}>{user.nickname}</div>
                  <div className={styles.rateComment}>{rate_comment(user)}</div>
                </div>
                <button>팔로우</button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
