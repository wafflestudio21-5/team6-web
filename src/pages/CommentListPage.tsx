import styles from "./CommentListPage.module.scss";
import profileDefault from "../assets/user_default.jpg";
import CommentCard from "../components/CommentCard";
// import { useEffect, useState } from "react";

// 임시 타입
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
    name: "이동진",
  },
  reviewRating: 4.5,
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

export default function CommentListPage() {
  // const [comments, setComments] = useState<Comment[]>([]);

  // useEffect(() => {
  //   const testComments = [...tmpComments];
  //   const handleScroll = () => {
  //     const { scrollTop, scrollHeight } = document.documentElement;
  //     console.log(window.innerHeight + scrollTop >= scrollHeight);
  //     if (window.innerHeight + scrollTop >= scrollHeight) {
  //       for (let i = 0; i < 8; i++) {
  //         testComments.push(tmpComment);
  //       }
  //       setComments([...testComments]);
  //     }
  //   };
  //   setComments(tmpComments);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className={styles.pageCon}>
      <header>
        <div className={styles.headerTitleBox}>
          <button />
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
