import { Link, useOutletContext } from "react-router-dom";
import styles from "./SearchUserList.module.scss";
import UserDefault from "../assets/user_default.jpg";
import { useState } from "react";
import { OutletContextType } from "../pages/Layout";
import { useAuthContext } from "../contexts/authContext";
import { postAddFollow, postUnFollow } from "../apis/user";
import { defaultResponseHandler } from "../apis/custom";

const rate_comment = (user: SearchUserType) => {
  if (user.bio) return user.bio;
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
  is_following: boolean;
};

function SearchUserCard({ user }: { user: SearchUserType }) {
  const { setCurrentModal } = useOutletContext<OutletContextType>();
  const { accessToken } = useAuthContext();
  const [following, setFollowing] = useState(user.is_following);
  const [updatingFollow, setUpdatingFollow] = useState(false);

  const onFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!accessToken) {
      setCurrentModal("login");
      return;
    }
    setUpdatingFollow(true);
    if (following) {
      postUnFollow(accessToken, user.id)
        .then(defaultResponseHandler)
        .then(() => {
          setFollowing(false);
          setUpdatingFollow(false);
        });
    } else {
      postAddFollow(accessToken, user.id)
        .then(defaultResponseHandler)
        .then(() => {
          setFollowing(true);
          setUpdatingFollow(false);
        });
    }
  };

  return (
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
          {following ? (
            <button
              onClick={onFollowClick}
              disabled={updatingFollow}
              className={styles.following}
            >
              팔로잉
            </button>
          ) : (
            <button
              onClick={onFollowClick}
              disabled={updatingFollow}
              className={styles.follow}
            >
              팔로우
            </button>
          )}
        </div>
      </Link>
    </li>
  );
}

export default function SearchUserList({
  contents,
}: {
  contents: SearchUserType[];
}) {
  return (
    <div className={styles.searchListContainer}>
      <ul className={styles.searchList}>
        {contents.map((user: SearchUserType) => (
          <SearchUserCard key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
