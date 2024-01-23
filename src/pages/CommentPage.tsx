import styles from "./CommentPage.module.scss";
import CommentInfo from "../components/CommentInfo";
import { useEffect, useState } from "react";
import { getCommentReplies, getCommentRequest } from "../apis/comment";
import { useParams } from "react-router-dom";
import { defaultResponseHandler } from "../apis/custom";
import { CommentType } from "../type";

export default function CommentPage() {
  const { id } = useParams();
  const [commentData, setCommentData] = useState<CommentType | null>(null);
  const [commentDataLoading, setCommentDataLoading] = useState(true);
  useEffect(() => {
    id &&
      getCommentRequest(parseInt(id))
        .then(defaultResponseHandler)
        .then((data: CommentType) => {
          setCommentData(data);
        })
        .catch(() => {
          alert("잘못된 요청입니다");
        })
        .finally(() => {
          setCommentDataLoading(false);
        });
  });

  // 지금은 오류
  useEffect(() => {
    id &&
      getCommentReplies(parseInt(id))
        .then(defaultResponseHandler)
        .then((data) => {
          console.log(data);
        })
        .catch(() => {
          alert("잘못된 요청입니다");
        });
  }, []);

  return (
    <section className={styles.commentPage}>
      {!commentDataLoading && commentData && (
        <CommentInfo comment={commentData} />
      )}
    </section>
  );
}
