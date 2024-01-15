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
        {rating}
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
      좋아요 {likes} 댓글 {replies}
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
