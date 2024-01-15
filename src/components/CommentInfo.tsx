import { Link } from "react-router-dom";
import userImage from "../assets/user_default.jpg";
import styles from "./CommentInfo.module.scss";
import { MovieType } from "./ContentList";

type ReplyType = {
  useName: string;
  date: Date;
  content: string;
  likes: number;
};

type CommentType = {
  userName: string;
  movie: MovieType;
  rating: number;
  content: string;
  date: Date;
  likes: number;
  replies: ReplyType[];
};

function elapsedTime(date: Date) {
  const start = date;
  const end = new Date();

  const diff = (end.getTime() - start.getTime()) / 1000;

  const times = [
    { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "일", milliSeconds: 60 * 60 * 24 },
    { name: "시간", milliSeconds: 60 * 60 },
    { name: "분", milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "방금 전";
}

function CommentHeader({
  userName,
  movie,
  rating,
  date,
}: {
  userName: string;
  movie: MovieType;
  rating: number;
  date: Date;
}) {
  return (
    <div className={styles.commentHeader}>
      <div className={styles.commentUser}>
        <Link className={styles.userLink} to="/users/idididid" title={userName}>
          <div className={styles.userImage}>
            <img src={userImage} alt={userName + "의 사진"} />
          </div>
          <div className={styles.userDate}>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.date}>{elapsedTime(date)}</div>
          </div>
        </Link>
        <Link to="/contents/idididid">
          <div className={styles.movieName}>{movie.name}</div>
          <div className={styles.releaseYear}>영화 · {movie.releaseYear}</div>
        </Link>
        <div className={styles.ratingDiv}>
          <div className={styles.rating}>
            <img
              width="16px"
              height="16px"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiM0QTRBNEEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDE3Ljk4bC02LjAxNSA0LjM5MmMtLjUwOC4zNzItMS4xOTQtLjEyNi0uOTk4LS43MjVsMi4zMTctNy4wODEtNi4wMzUtNC4zNjdjLS41MS0uMzY5LS4yNDctMS4xNzUuMzgyLTEuMTc0bDcuNDQ3LjAxNiAyLjI4Ni03LjA5MWMuMTkyLS42IDEuMDQtLjYgMS4yMzMgMGwyLjI4NiA3LjA5IDcuNDQ3LS4wMTVjLjYyOS0uMDAxLjg5LjgwNS4zOCAxLjE3NGwtNi4wMzMgNC4zNjcgMi4zMTYgNy4wOGMuMTk2LjYtLjQ5IDEuMDk4LS45OTkuNzI2TDEyIDE3Ljk4eiIvPgo8L3N2Zz4K"
              alt="star"
            />
            <span className={styles.ratingText}>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <Link to="/contents/idididid" title={movie.name}>
        <div className={styles.poster}>
          <img src={movie.posterUrl} alt={movie.name + "의 포스터"} />
        </div>
      </Link>
    </div>
  );
}

function CommentBody({ content }: { content: string }) {
  return <div className={styles.commentBody}>{content}</div>;
}

function CommentLikeReply({
  likes,
  replies,
}: {
  likes: number;
  replies: number;
}) {
  return (
    <div className={styles.commentLikeReply}>
      <span className={styles.likes}>좋아요 {likes}</span>
      <span>댓글 {replies}</span>
    </div>
  );
}

export default function CommentInfo({ comment }: { comment: CommentType }) {
  return (
    <section className={styles.commentInfo}>
      <CommentHeader
        userName={comment.userName}
        movie={comment.movie}
        rating={comment.rating}
        date={comment.date}
      />
      <CommentBody content={comment.content} />
      <CommentLikeReply
        likes={comment.likes}
        replies={comment.replies.length}
      />
    </section>
  );
}
