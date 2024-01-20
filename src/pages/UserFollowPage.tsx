import { useEffect } from "react";
import UserCard from "../components/user/UserCard";
import styles from "./UserFollowPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
useEffect;
export default function UserFollowPage() {
  const { pathname } = useLocation();
  const mode = pathname.split("/")[pathname.split("/").length - 1];
  const title = mode === "followings" ? "팔로잉 중" : "팔로워";
  const navigate = useNavigate();
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);
  return (
    <>
      <div className={styles.fixedTab}>
        <div className={styles.backButtonContainer}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className={styles.titleContainer}>{title}</div>
      </div>
      <div className={styles.followPage}>
        <div className={styles.followListContainer}>
          <ul className={styles.followList}>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </ul>
        </div>
      </div>
    </>
  );
}
