import CommentCard from "../../components/CommentCard";
import styles from "./UserLikesCommentListPage.module.scss";
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
    name: "홍길동",
  },
  reviewRating: 3,
  text: `여기에는 해당 유저가 좋아요를 누른 코멘트가 들어갑니다.
  `,
  likeCount: 200,
  subcommentCount: 1000,
};
const tmpComments = [] as Comment[];

for (let i = 0; i < 8; i++) {
  tmpComments.push(tmpComment);
}

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
          {tmpComments.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </ul>
      </main>
    </div>
  );
}
