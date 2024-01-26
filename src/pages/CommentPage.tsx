import styles from "./CommentPage.module.scss";
import CommentInfo from "../components/CommentInfo";
import { useEffect, useState } from "react";
import { getCommentRequest } from "../apis/comment";
import { useParams } from "react-router-dom";
import { defaultResponseHandler } from "../apis/custom";
import { CommentType } from "../type";
import { useAuthContext } from "../contexts/authContext";

export default function CommentPage() {
  const { id } = useParams();
  const [commentData, setCommentData] = useState<CommentType | null>(null);
  const [commentDataLoading, setCommentDataLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const { accessToken } = useAuthContext();
  const refetchComment = () => setRefetch(!refetch);
  useEffect(() => {
    id &&
      getCommentRequest(parseInt(id), accessToken ?? undefined)
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
  }, [refetch]);

  return (
    <section className={styles.commentPage}>
      {!commentDataLoading && commentData && (
        <CommentInfo
          comment={commentData}
          setComment={setCommentData}
          refetchComment={refetchComment}
        />
      )}
    </section>
  );
}
