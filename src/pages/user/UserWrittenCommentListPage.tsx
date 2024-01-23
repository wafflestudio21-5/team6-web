import CommentCard from "../../components/CommentCard";
import styles from "./UserWrittenCommentListPage.module.scss";
// import profileDefault from "../../assets/user_default.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserWrittenComments } from "../../apis/user";
import { useState } from "react";
import { defaultResponseHandler } from "../../apis/custom";
import { CommentByUserType, CommentsResType } from "../../type";

export default function UserWrittenCommentListPage() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [comments, setComments] = useState<CommentByUserType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextCommentsUrl, setNextCommentsUrl] = useState<string | null>(null);

  useEffect(() => {
    userId &&
      getUserWrittenComments(parseInt(userId))
        .then(defaultResponseHandler)
        .then((data) => {
          const commentsResponse = data;
          setComments(commentsResponse.results);
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
