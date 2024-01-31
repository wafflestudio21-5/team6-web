import CommentCard from "../../components/CommentCard";
import styles from "./UserWrittenCommentListPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserWrittenComments } from "../../apis/user";
import { useState } from "react";
import { defaultResponseHandler } from "../../apis/custom";

import { CommentType, SortQueryType } from "../../type";
import SortMoadal from "../../components/SortModal";
import { useAuthContext } from "../../contexts/authContext";

export default function UserWrittenCommentListPage() {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();
  const { id: userId } = useParams();
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextCommentsUrl, setNextCommentsUrl] = useState<string | null>(null);

  const [sortQuery, setSortQuery] = useState<SortQueryType>("like");
  const [currentModal, setCurrenModal] = useState<null | "sort">(null);

  useEffect(() => {
    userId &&
      getUserWrittenComments(
        parseInt(userId),
        accessToken ?? undefined,
        sortQuery,
      )
        .then(defaultResponseHandler)
        .then((data) => {
          console.log("success!!!!", data);

          const commentsResponse = data;
          setComments(commentsResponse.results);
          setNextCommentsUrl(commentsResponse.next);
        })
        .catch(() => alert("잘못된 요청입니다"))
        .finally(() => {
          setLoading(false);
        });
  }, [sortQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;

      if (window.innerHeight + scrollTop + 150 >= scrollHeight) {
        nextCommentsUrl &&
          comments &&
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

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);

  return (
    <div className={styles.pageCon}>
      {currentModal === "sort" && (
        <SortMoadal
          sortQuery={sortQuery}
          setSortQuery={setSortQuery}
          onCloseModal={() => {
            setCurrenModal(null);
          }}
        />
      )}

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
