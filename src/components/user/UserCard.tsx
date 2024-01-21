import { useState } from "react";
import styles from "./UserCard.module.scss";
import { Link } from "react-router-dom";

import { FollowerType } from "../../type";
import { deleteFollow, postAddFollow } from "../../apis/user";
import { useAuthContext } from "../../contexts/authContext";

export default function UserCard({ follower }: { follower: FollowerType }) {
  const [isFollowing, setIsFollowing] = useState(false); // 나중에는 내 유저 데이터의 팔로우 목록과 비교하여 팔로우 중인지 아닌지를 판단해야 함
  const { accessToken } = useAuthContext();

  return (
    <li>
      <Link to={`/users/${follower.id}`}>
        <div className={styles.imgBox}>
          <img
            src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_large-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
            alt="userImg"

          />
        </div>
        <div className={styles.userBox}>
          <div className={styles.infoWrapper}>

            <p>{follower.nickname}</p>
            <div>{follower.bio}</div>

          </div>
          <div className={styles.followButtonWrapper}>
            <button
              className={
                isFollowing ? styles.isFollowing : styles.isNotFollowing
              }
              onClick={(e) => {
                e.preventDefault();

                if (!accessToken) return alert("로그인이 필요합니다.");
                isFollowing
                  ? deleteFollow(accessToken, follower.id)
                  : postAddFollow(accessToken, follower.id);

                setIsFollowing(!isFollowing);
              }}
            >
              {isFollowing ? "팔로워" : "팔로잉"}
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}
