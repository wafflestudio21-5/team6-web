import styles from "./CommentListPage.module.scss";
import CommentCard from "../components/CommentCard";
import { useEffect, useState } from "react";
import { CommentsResType, CommentType } from "../type";
import { useParams } from "react-router-dom";
import { getCommentListRequest } from "../apis/comment";
import { defaultResponseHandler } from "../apis/custom";
// import { convertKeysToCamelCase } from "../utils/snackToCamel";

export default function CommentListPage() {
  const { id: movieCD } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [nextCommentsUrl, setNextCommentsUrl] = useState<string | null>(null);

  useEffect(() => {
    movieCD &&
      getCommentListRequest(movieCD)
        .then(defaultResponseHandler)
        .then((data) => {
          const commentsResponse = data;
          setComments(commentsResponse.results);
          setNextCommentsUrl(commentsResponse.next);
        })
        .catch(() => alert("잘못된 요청입니다"));
  }, [movieCD]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 150 >= scrollHeight) {
        nextCommentsUrl &&
          fetch(nextCommentsUrl)
            .then(defaultResponseHandler)
            .then((data) => {
              console.log("scroll success  :", data);
              const commentsResponse = data;
              setComments(comments.concat(commentsResponse.results));
              setNextCommentsUrl(commentsResponse.next);
            })
            .catch(() => alert("잘못된 요청입니다"));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [comments]);

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
          {comments.map((comment, index) => (
            <CommentCard key={index} comment={comment} /> // commentId가 같은 것이 있어서 index 임시
          ))}
        </ul>
      </main>
    </div>
  );
}
