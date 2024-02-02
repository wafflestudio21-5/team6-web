import styles from "./Userpage.module.scss";
import User from "../../components/user/User";
import useMoveScrollToTop from "../../hooks/useMoveScrollToTop";
export default function UserPage() {
  useMoveScrollToTop();
  return (
    <div className={styles.background}>
      <User />
    </div>
  );
}
