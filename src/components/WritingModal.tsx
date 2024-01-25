import { createCommentRequest, updateCommentRequest } from "../apis/comment";
import { CommentType, MovieType } from "../type";
import Modal from "./Modal";
import styles from "./WritingModal.module.scss";
import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { defaultResponseHandler } from "../apis/custom";

type WritingModalProps = {
  type: "comment" | "reply";
  title: string;
  content: MovieType;
  currentModal: "updateComment" | "createComment" | null;
  setCurrentModal: (
    currentModal: "updateComment" | "createComment" | null,
  ) => void;
  setContent: (content: MovieType) => void;
};

export default function WritingModal(props: WritingModalProps) {
  const { accessToken } = useAuthContext();
  const { type, title, content, currentModal, setCurrentModal, setContent } =
    props;
  const { my_comment, movieCD } = content;

  const [commentInput, setCommentInput] = useState(
    my_comment === null ? "" : my_comment.content,
  ); //comment는 기존에 썼던 코멘트가 있을 경우에만 존재
  const [hasSpoiler, setHasSpoiler] = useState(
    my_comment === null ? false : my_comment.has_spoiler,
  );

  return (
    <Modal
      onClose={() => {
        setCurrentModal(null);
      }}
    >
      <div className={styles.writingCon}>
        <header>
          <h2>{title}</h2>
          <button
            onClick={() => {
              setCurrentModal(null);
            }}
          ></button>
        </header>
        <main>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              console.log(movieCD, accessToken, commentInput, !hasSpoiler);
              currentModal === "createComment" &&
                accessToken &&
                createCommentRequest(
                  movieCD,
                  accessToken,
                  commentInput,
                  hasSpoiler,
                )
                  .then(defaultResponseHandler)
                  .then((data: CommentType) => {
                    console.log("data : ", data);
                    console.log("content : ", data.content);
                    setContent({
                      ...content,
                      my_comment: data,
                    });
                    setCurrentModal(null);
                  });
              currentModal === "updateComment" &&
                accessToken &&
                my_comment &&
                updateCommentRequest(
                  my_comment?.id,
                  accessToken,
                  commentInput,
                  hasSpoiler,
                )
                  .then(defaultResponseHandler)
                  .then((data: CommentType) => {
                    console.log("data : ", data);
                    console.log("content : ", data.content);
                    setContent({
                      ...content,
                      my_comment: data,
                    });
                    setCurrentModal(null);
                  });
            }}
          >
            <textarea
              placeholder="이 작품을 대한 생각을 자유롭게 표현해주세요."
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
            <nav>
              {type === "comment" && (
                <button
                  type="button"
                  className={styles.spoilerButton}
                  onClick={() => {
                    setHasSpoiler(!hasSpoiler);
                  }}
                >
                  <svg
                    className={hasSpoiler ? styles.checked : ""}
                    fill="none"
                    height="30"
                    viewBox="0 0 24 24"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9998 1.89462C6.41882 1.89462 1.89453 6.41891 1.89453 11.9999C1.89453 17.5809 6.41882 22.1052 11.9998 22.1052C17.5808 22.1052 22.1051 17.5809 22.1051 11.9999C22.1051 6.41891 17.5808 1.89462 11.9998 1.89462ZM7.78928 11.4662C8.02183 11.0634 8.53685 10.9254 8.93962 11.158L12.0061 12.9284L15.0612 11.1645C15.464 10.932 15.979 11.07 16.2116 11.4728C16.4441 11.8755 16.3061 12.3906 15.9034 12.6231L13.6903 13.9008L15.8678 15.158C16.2706 15.3905 16.4086 15.9055 16.1761 16.3083C15.9435 16.7111 15.4285 16.8491 15.0257 16.6165L12.0061 14.8732L8.97515 16.6231C8.57237 16.8556 8.05735 16.7176 7.82481 16.3149C7.59227 15.9121 7.73027 15.3971 8.13304 15.1645L10.3219 13.9008L8.09752 12.6165C7.69474 12.384 7.55674 11.869 7.78928 11.4662ZM7.9998 8.21074C7.9998 7.74566 8.37682 7.36864 8.8419 7.36864H9.05243C9.51751 7.36864 9.89454 7.74566 9.89454 8.21074V8.84232C9.89454 9.3074 9.51751 9.68443 9.05243 9.68443H8.8419C8.37682 9.68443 7.9998 9.3074 7.9998 8.84232V8.21074ZM14.9472 7.36864C14.4821 7.36864 14.1051 7.74566 14.1051 8.21074V8.84232C14.1051 9.3074 14.4821 9.68443 14.9472 9.68443H15.1577C15.6228 9.68443 15.9998 9.3074 15.9998 8.84232V8.21074C15.9998 7.74566 15.6228 7.36864 15.1577 7.36864H14.9472Z"
                      fill="#C4C4C4"
                    ></path>
                  </svg>
                </button>
              )}
              <div className={styles.navSubCon}>
                <div className={styles.textConut}>
                  {commentInput.length}/10000
                </div>
                <button type="submit" className={styles.submitButton}>
                  {currentModal == "createComment" ? "등록" : "수정"}
                </button>
              </div>
            </nav>
          </form>
        </main>
      </div>
    </Modal>
  );
}
