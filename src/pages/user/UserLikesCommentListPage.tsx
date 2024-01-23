import CommentCard from "../../components/CommentCard";
import styles from "./UserLikesCommentListPage.module.scss";
// import profileDefault from "../../assets/user_default.jpg";
import { tmpCommentListInUserPage } from "../../tmp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserLikesPage() {
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
          <h2>내가 좋아요한 코멘트</h2>
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
