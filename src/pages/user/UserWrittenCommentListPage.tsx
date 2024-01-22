import CommentCard from "../../components/CommentCard";
import styles from "./UserWrittenCommentListPage.module.scss";
// import profileDefault from "../../assets/user_default.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserWrittenComments } from "../../apis/user";
import { useState } from "react";
import { defaultResponseHandler } from "../../apis/custom";
import { CommentInUserPageType } from "../../type";

export default function UserWrittenCommentListPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [query, setQuery] = useState<string>();
  const [userCommentsData, setUserCommentsData] = useState<
    CommentInUserPageType[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);
  useEffect(() => {
    id &&
      getUserWrittenComments(parseInt(id))
        .then(defaultResponseHandler)
        .then((data) => {
          setUserCommentsData(data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [query]);
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
            userCommentsData &&
            userCommentsData.map((comment) => (
              <CommentCard comment={comment} />
            ))}
        </ul>
      </main>
    </div>
  );
}
