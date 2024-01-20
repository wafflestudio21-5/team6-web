import styles from "./Userpage.module.scss";
import User from "../../components/user/User";
export default function UserPage() {
  return (
    <div className={styles.background}>
      <User />
    </div>
  );
}
