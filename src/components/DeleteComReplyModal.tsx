import Modal from "./Modal";
import styles from "./DeleteComReplyModal.module.scss";
import { CommentType, ReplyType } from "../type";
import { deleteCommentRequest, deleteReply } from "../apis/comment";
import { useAuthContext } from "../contexts/authContext";

type DeleteComReplyModalProps = {
  setCurrentModalState: (value: null) => void;
  currentModalState:
    | { type: "deleteReply"; targetReply: ReplyType }
    | { type: "deleteComment"; targetComment: CommentType };
  deleteReplyState: (replyId: number) => void;
};

export default function DeleteComReplyModal({
  setCurrentModalState,
  currentModalState,
  deleteReplyState,
}: DeleteComReplyModalProps) {
  const modalType = currentModalState.type;
  const { accessToken } = useAuthContext();
  return (
    <Modal
      onClose={() => {
        setCurrentModalState(null);
      }}
    >
      <div
        className={styles.alertBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>정말로 삭제하시겠습니까?</p>
        <div className={styles.buttonBox}>
          <button
            onClick={() => {
              setCurrentModalState(null);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              if (!accessToken) return;
              modalType === "deleteReply" &&
                deleteReply(currentModalState.targetReply.id, accessToken)
                  .then((res) => {
                    if (!res.ok) throw new Error("삭제 실패");
                    deleteReplyState(currentModalState.targetReply.id);
                    setCurrentModalState(null);
                  })
                  .catch((e) => {
                    console.log(e);
                    console.log("실패");
                  });
              modalType === "deleteComment" &&
                deleteCommentRequest(
                  currentModalState.targetComment.id,
                  accessToken
                )
                  .then((res) => {
                    if (!res.ok) throw new Error("삭제 실패");
                    window.document.location.href = `/contents/${currentModalState.targetComment.movie}`;
                  })
                  .catch((e) => {
                    console.log(e);
                    console.log("실패");
                  });
            }}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
