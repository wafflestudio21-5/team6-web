import CommentCard from "../../components/CommentCard";
import styles from "./UserWrittenCommentListPage.module.scss";
import profileDefault from "../../assets/user_default.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserWrittenComments } from "../../apis/user";

type CommentType = {
  id: number;
  created_by: {};
  movie: {
    movieCD: string;
    title_ko: string;
    poster: string;
    release_date: string;
  };
  content: string; // 실제 코멘트
  rating: null | number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  reply_count: number;
};

export default function UserWrittenCommentListPage() {
  const navigate = useNavigate();
  const [pageCommentList, setPageCommentList] = useState<CommentType[] | null>(
    null,
  );
  const [pageCommentListLoading, setPageCommentListLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  });
  useEffect(() => {
    if (!id) return;
    getUserWrittenComments(parseInt(id))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("coments : ", data);
        setPageCommentList(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setPageCommentListLoading(false);
      });
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
        {!pageCommentListLoading && pageCommentList && (
          <ul>
            {/*  {pageCommentList.map((comment) => (
              <CommentCard comment={comment} />
            ))}*/}
          </ul>
        )}
      </main>
    </div>
  );
}
