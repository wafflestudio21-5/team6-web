import styles from "./CommentListPage.module.scss";
import CommentCard from "../components/CommentCard";
import { useEffect, useState } from "react";
import { CommentType } from "../type";
import { Link, useParams } from "react-router-dom";
import { getCommentListRequest } from "../apis/comment";
import { defaultResponseHandler } from "../apis/custom";
import { SortQueryType } from "../type";
import SortMoadal from "../components/SortModal";
import useChangeTitle from "../hooks/useChangeTitle";
import { useAuthContext } from "../contexts/authContext";

export default function CommentListPage() {
  const { id: movieCD } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [nextCommentsUrl, setNextCommentsUrl] = useState<string | null>(null);
  const [sortQuery, setSortQuery] = useState<SortQueryType>("like");
  const [currentModal, setCurrenModal] = useState<null | "sort">(null);
  const { setTitle } = useChangeTitle();
  const { accessToken } = useAuthContext();

  useEffect(() => {
    movieCD &&
      getCommentListRequest(movieCD, accessToken ?? undefined, sortQuery)
        .then(defaultResponseHandler)
        .then((data) => {
          const commentsResponse = data;
          setTitle(
            `${commentsResponse.results.length}개의 코멘트 목록 - 와플피디아`,
          );
          setComments(commentsResponse.results);
          setNextCommentsUrl(commentsResponse.next);
        })
        .catch(() => alert("잘못된 요청입니다"));
  }, [movieCD, sortQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 150 >= scrollHeight) {
        nextCommentsUrl &&
          fetch(nextCommentsUrl, {
            method: "GET",
            headers: accessToken
              ? {
                  Authorization: "Bearer " + accessToken,
                }
              : {},
          })
            .then(defaultResponseHandler)
            .then((data) => {
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
      {currentModal === "sort" && (
        <SortMoadal
          sortQuery={sortQuery}
          onCloseModal={() => {
            setCurrenModal(null);
          }}
          setSortQuery={setSortQuery}
        />
      )}
      <header>
        <div className={styles.headerTitleBox}>
          <Link to={"/contents/" + movieCD}>
            <button />
          </Link>
          <h2>코멘트</h2>
        </div>
        <nav>
          <button
            onClick={() => {
              setCurrenModal("sort");
            }}
          >
            <div className={styles.bottomArrow} />
            {sortQuery === "like" && "좋아요 순"}
            {sortQuery === "created" && "최신 순"}
            {sortQuery === "high-rating" && "높은 별점 순"}
            {sortQuery === "low-rating" && "낮은 별점 순"}
          </button>
        </nav>
      </header>
      <main className={styles.commentListCon}>
        <ul>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </ul>
      </main>
    </div>
  );
}
