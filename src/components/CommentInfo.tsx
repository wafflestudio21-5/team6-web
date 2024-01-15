import styles from "./CommentInfo.module.scss";
import { MovieType } from "./ContentList";

type CommentType = {
  userName: string;
  movie: MovieType;
  rating: number;
  content: string;
};

function CommentHeader({
  userName,
  movie,
  rating,
}: {
  userName: string;
  movie: MovieType;
  rating: number;
}) {
  return (
    <div className={styles.commentHeader}>
      {userName}의 {movie.name} 평가({rating.toFixed(1)}점)
    </div>
  );
}

function CommentBody({ content }: { content: string }) {
  return <div className={styles.commentBody}>{content}</div>;
}

export default function CommentInfo({ comment }: { comment: CommentType }) {
  return (
    <section className={styles.commentInfo}>
      <CommentHeader
        userName={comment.userName}
        movie={comment.movie}
        rating={comment.rating}
      />
      <CommentBody content={comment.content} />
    </section>
  );
}
