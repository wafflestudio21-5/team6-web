import CommentCard from "../../components/CommentCard";
import styles from "./UserWrittenCommentListPage.module.scss";
// import profileDefault from "../../assets/user_default.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { tmpCommentListInUserPage } from "../../tmp";

export default function UserWrittenCommentListPage() {
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
    <div className={styles.pageCon}>
      <header>
        <div className={styles.headerTitleBox}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          />
          <h2>코멘트</h2>
        </div>
        <nav>
          <button>
            <div className={styles.bottomArrow} />
            좋아요 순
          </button>
        </nav>
      </header>
      <main className={styles.commentListCon}>
        <ul>
          {tmpCommentListInUserPage.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </ul>
      </main>
    </div>
  );
}
