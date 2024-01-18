import { ReplyType } from "./CommentInfo";
import styles from "./ReplyList.module.scss";
import userImage from "../assets/user_default.jpg";
import { Link } from "react-router-dom";
import elapsedTime from "../utils/elapsedTime";
import { useState } from "react";

function Reply({ reply }: { reply: ReplyType }) {
  const [liked, setLiked] = useState(reply.liked);
  const [likes, setLikes] = useState(reply.likes);

  const onLikeClick = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={styles.reply}>
      <Link to="/users/idididid">
        <div className={styles.userImage}>
          <img src={userImage} alt={reply.userName + "의 사진"} />
        </div>
      </Link>
      <div className={styles.replyBody}>
        <div className={styles.replyHeader}>
          <Link to="users/idididid">
            <div className={styles.userName}>{reply.userName}</div>
          </Link>
          <div className={styles.timeAgo}>{elapsedTime(reply.date)}</div>
        </div>
        <div className={styles.replyContent}>{reply.content}</div>
        <button
          className={liked ? styles.liked : styles.unliked}
          onClick={onLikeClick}
        >
          {liked ? (
            <svg className={styles.likeSvg} fill="#ff2f6e" viewBox="0 0 20 20">
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M5.6252 7.90479H3.1252C2.6652 7.90479 2.29187 8.27812 2.29187 8.73812V17.0715C2.29187 17.5315 2.6652 17.9048 3.1252 17.9048H5.6252C6.08604 17.9048 6.45854 17.5315 6.45854 17.0715V8.73812C6.45854 8.27812 6.08604 7.90479 5.6252 7.90479Z"
                fill="#FF2F6E"
                fillRule="evenodd"
              ></path>
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M17.2146 7.13879C16.8388 6.70796 16.2979 6.46129 15.7321 6.46129H13.8504L13.9871 5.93879C14.1013 5.49879 14.1546 5.00546 14.1546 4.38629C14.1546 2.78712 13.0088 2.07129 11.8729 2.07129C11.5029 2.07129 11.2346 2.17379 11.0513 2.38462C10.8846 2.57379 10.8163 2.82546 10.8488 3.16379L10.8738 4.18879L8.45459 6.63796C7.96043 7.13879 7.70959 7.66379 7.70959 8.19879V16.238C7.70959 16.4671 7.89626 16.6546 8.12626 16.6546H14.5321C15.5088 16.6546 16.3663 15.908 16.4888 14.9288L17.6929 8.71962C17.7646 8.14712 17.5888 7.57129 17.2146 7.13879Z"
                fill="#FF2F6E"
                fillRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg className={styles.likeSvg} viewBox="0 0 20 20">
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M5.6252 7.9043H3.1252C2.6652 7.9043 2.29187 8.27763 2.29187 8.73763V17.071C2.29187 17.531 2.6652 17.9043 3.1252 17.9043H5.6252C6.08604 17.9043 6.45854 17.531 6.45854 17.071V8.73763C6.45854 8.27763 6.08604 7.9043 5.6252 7.9043Z"
                fill="#87898B"
                fillRule="evenodd"
              ></path>
              <path
                className={styles.fillTarget}
                clipRule="evenodd"
                d="M11.71 4.34525L11.7017 3.99359L11.6825 3.14525L11.6809 3.09692L11.6759 3.04942C11.6684 2.96942 11.6792 2.93442 11.6775 2.93275C11.6917 2.92442 11.7534 2.90442 11.8725 2.90442C12.115 2.90442 13.3225 2.97609 13.3225 4.38692C13.3225 4.93359 13.2775 5.35859 13.1809 5.72692L12.8375 7.03275C12.8034 7.16525 12.9025 7.29442 13.0392 7.29442H14.3892H15.7317C16.0575 7.29442 16.3684 7.43692 16.585 7.68442C16.7975 7.93025 16.9009 8.25609 16.87 8.58275L15.6717 14.7703L15.6634 14.8119L15.6584 14.8536C15.59 15.3961 15.0959 15.8211 14.5334 15.8211H8.54169V8.19942C8.54169 7.89109 8.71169 7.56275 9.04835 7.22359L11.3417 4.90025L11.5775 4.66109C11.71 4.52359 11.71 4.34525 11.71 4.34525ZM17.5275 6.86525C17.0734 6.34275 16.4184 6.04442 15.7317 6.04442H14.3892C14.5167 5.56025 14.5725 5.02942 14.5725 4.38692C14.5725 2.50942 13.1734 1.65442 11.8725 1.65442C11.3825 1.65442 11 1.80775 10.7367 2.11025C10.5667 2.30359 10.3792 2.64442 10.4325 3.17359L10.4517 4.02192L8.15835 6.34525C7.58335 6.92692 7.29169 7.55109 7.29169 8.19942V16.2378C7.29169 16.6978 7.66502 17.0711 8.12502 17.0711H14.5334C15.7342 17.0711 16.7559 16.1603 16.8992 15.0078L18.1067 8.77192C18.1925 8.08109 17.9809 7.38692 17.5275 6.86525Z"
                fill="#87898B"
                fillRule="evenodd"
              ></path>
            </svg>
          )}
          {likes}
        </button>
      </div>
    </div>
  );
}

export default function ReplyList({ replyNumber }: { replyNumber: number }) {
  const defaultReply = {
    userName: "J. Robert Oppenheimer",
    date: new Date("2024-01-15 10:00"),
    content: "I felt good.",
    likes: 100,
    liked: false,
  };

  const [replies, setReplies] = useState<ReplyType[]>(
    new Array(9).fill(defaultReply),
  );

  const showMoreReplies = () => {
    if (replies.length == replyNumber) return;
    const numberToAdd = Math.min(replyNumber - replies.length, 9);
    setReplies(replies.concat(new Array(numberToAdd).fill(defaultReply)));
  };

  return (
    <section className={styles.replyList}>
      <div className={styles.replyListHeader}>
        {replies.length == replyNumber || (
          <>
            <button onClick={showMoreReplies}>이전 댓글 보기</button>
            <div>
              {replyNumber}개 중 {replies.length}개
            </div>
          </>
        )}
      </div>
      <div className={styles.replies}>
        {replies.map((reply: ReplyType, index: number) => (
          <Reply reply={reply} key={index} />
        ))}
      </div>
    </section>
  );
}
