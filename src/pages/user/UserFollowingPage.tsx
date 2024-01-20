import { useEffect } from "react";
import UserCard from "../../components/user/UserCard";
import styles from "./UserFollowingPage.module.scss";
import { useNavigate } from "react-router-dom";

export default function UserFollowingPage() {
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
        <div className={styles.titleContainer}>팔로잉</div>
      </div>
      <div className={styles.followPage}>
        <div className={styles.followListContainer}>
          <ul className={styles.followList}>
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
