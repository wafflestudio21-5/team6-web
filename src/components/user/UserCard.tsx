import { useState } from "react";
import styles from "./UserCard.module.scss";
import { Link } from "react-router-dom";
import { FollowType } from "../../type";
import { postUnFollow, postAddFollow } from "../../apis/user";
import { useAuthContext } from "../../contexts/authContext";

import { defaultResponseHandler } from "../../apis/custom";

export default function UserCard({
  follower,
  isMyFollowing,
}: {
  follower: FollowType;
  isMyFollowing: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(isMyFollowing); // 나중에는 내 유저 데이터의 팔로우 목록과 비교하여 팔로우 중인지 아닌지를 판단해야 함
  const { accessToken, myUserData } = useAuthContext();
  const myId = myUserData?.id;
  const isMyUserCard = follower.id === myId;
  const buttonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!accessToken) return;
    isFollowing
      ? postUnFollow(accessToken, follower.id)
          .then(defaultResponseHandler)
          .then(() => {
            setIsFollowing(false);
          })
          .catch(() => {
            console.log("팔로우 취소 실패");
          })
      : postAddFollow(accessToken, follower.id)
          .then(defaultResponseHandler)
          .then(() => {
            setIsFollowing(true);
          })
          .catch(() => {
            console.log("팔로우 실패");
          });
  };

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
            {!isMyUserCard && (
              <button
                className={
                  isFollowing ? styles.isFollowing : styles.isNotFollowing
                }
                onClick={buttonClickHandler}
              >
                {isFollowing ? "팔로잉" : "팔로우"}
              </button>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
