import CommentCard from "../../components/CommentCard";
import styles from "./UserCommentListPage.module.scss";
import profileDefault from "../../assets/user_default.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
type Comment = {
  user: {
    img: string;
    name: string;
  };
  reviewRating: number;
  text: string;
  likeCount: number;
  subcommentCount: number;
};

const tmpComment: Comment = {
  user: {
    img: profileDefault,
    name: "오수현",
  },
  reviewRating: 3,
  text: `줄리어스 로버트 오펜하이머..
줄리어스 로버트 오펜하이머..
자기 이야기가 영화로 만들어진다니.
로버트는 얼마나 좋았을까.
  `,
  likeCount: 200,
  subcommentCount: 1000,
};
const tmpComments = [] as Comment[];

for (let i = 0; i < 8; i++) {
  tmpComments.push(tmpComment);
}

export default function UserCommentListPage() {
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
          {tmpComments.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </ul>
      </main>
    </div>
  );
}
