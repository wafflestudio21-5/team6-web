import styles from "./CommentPage.module.scss";
import CommentInfo from "../components/CommentInfo";
import { useEffect, useState } from "react";
import { getCommentRequest } from "../apis/comment";
import { useParams } from "react-router-dom";
import { defaultResponseHandler } from "../apis/custom";
import { CommentType } from "../type";
import { useAuthContext } from "../contexts/authContext";
import useChangeTitle from "../hooks/useChangeTitle";
import useMoveScrollToTop from "../hooks/useMoveScrollToTop";

export default function CommentPage() {
  const { id } = useParams();
  const [commentData, setCommentData] = useState<CommentType | null>(null);
  const [commentDataLoading, setCommentDataLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const { accessToken } = useAuthContext();
  const { setTitle } = useChangeTitle();
  const refetchComment = () => setRefetch(!refetch);
  useMoveScrollToTop();
  useEffect(() => {
    id &&
      getCommentRequest(parseInt(id), accessToken ?? undefined)
        .then(defaultResponseHandler)
        .then((data: CommentType) => {
          setCommentData(data);
          setTitle(
            data.created_by.nickname +
              `님이 "${
                data.movie.title_ko ?? "영화"
              }"에 남긴 코멘트 - 와플피디아`,
          );
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
