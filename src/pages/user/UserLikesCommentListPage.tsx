import CommentCard from "../../components/CommentCard";
import styles from "./UserWrittenCommentListPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { defaultResponseHandler } from "../../apis/custom";
import { CommentType } from "../../type";
import { getMyLikesComments } from "../../apis/auth";
import { useAuthContext } from "../../contexts/authContext";

export default function UserLikesCommentListPage() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { accessToken } = useAuthContext();
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextCommentsUrl, setNextCommentsUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    if (!userId) return;
    setLoading(true);
    getMyLikesComments(accessToken)
      .then(defaultResponseHandler)
      .then((data) => {
        const commentsResponse = data;
        setComments(
          commentsResponse.results.map((comment: CommentType) => {
            return { ...comment, liked_by_user: true };
          }),
        );
        setNextCommentsUrl(commentsResponse.next);
      })
      .catch(() => alert("잘못된 요청입니다"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 150 >= scrollHeight) {
        nextCommentsUrl &&
          comments &&
          fetch(nextCommentsUrl)
            .then(defaultResponseHandler)
            .then((data) => {
              const commentsResponse = data;
              setComments(
                comments.concat(
                  commentsResponse.results.map((comment: CommentType) => {
                    return { ...comment, liked_by_user: true };
                  }),
                ),
              );
              setNextCommentsUrl(commentsResponse.next);
            })
            .catch(() => alert("잘못된 요청입니다"));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [comments]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 150 >= scrollHeight) {
        nextCommentsUrl &&
          comments &&
          fetch(nextCommentsUrl)
            .then(defaultResponseHandler)
            .then((data) => {
              const commentsResponse = data;
              setComments(
                comments.concat(
                  commentsResponse.results.map((comment: CommentType) => {
                    return { ...comment, liked_by_user: true };
                  }),
                ),
              );
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
          <button
            onClick={() => {
              navigate(-1);
            }}
          />
          <h2>내가 좋아요 한 코멘트</h2>
        </div>
      </header>
      <main className={styles.commentListCon}>
        <ul>
          {!loading &&
            comments &&
            comments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
        </ul>
      </main>
    </div>
  );
}
