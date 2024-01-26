import { useAuthContext } from "../contexts/authContext";
import styles from "./MyCommentBox.module.scss";
import profileDefault from "../assets/user_default.jpg";
import { Link } from "react-router-dom";
import { MovieType } from "../type";
import { deleteCommentRequest } from "../apis/comment";

export default function MyCommentBox({
  myRate,
  openModal,
  content,
  setContent,
  closeModal,
}: {
  myRate: number;
  openModal: (type: "updateComment" | "createComment") => void;
  closeModal: () => void;
  content: MovieType;
  setContent: (content: MovieType) => void;
}) {
  const { isLogined, myUserData, accessToken } = useAuthContext();
  const my_comment = content.my_comment;

  const message =
    myRate < 2.5
      ? myRate == 2
        ? `좋은 평가네요. ${myUserData?.nickname} 님의 생각을 글로 남겨보세요`
        : `이 작품에 대한 ${myUserData?.nickname} 님의 평가를 글로 남겨보세요`
      : `대단한 작품이군요! ${myUserData?.nickname} 님의 감동을 글로 남겨보세요`;

  return (
    isLogined && (
      <>
        {my_comment ? (
          <div className={styles.commentCon}>
            <h3>내가 쓴 코멘트</h3>
            <div className={styles.commentBox}>
              <img className={styles.userImage} src={profileDefault} alt="" />
              <Link
                to={`/comments/${my_comment.id}`}
                className={styles.commentText}
              >
                {my_comment.content}
              </Link>
              <div className={styles.commentBtnBox}>
                <button onClick={() => openModal("updateComment")}>
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0EwQTBBMCIgZD0iTTIuMTggMTUuMzlsLjcwMy0zLjk4IDMuNzEzIDMuNzEyLTMuOTgxLjcwMmEuMzc0LjM3NCAwIDAgMS0uNDM0LS40MzR6bTEuNDk4LTQuNzc2bDYuMzY0LTYuMzY0IDMuNzEzIDMuNzEyLTYuMzY0IDYuMzY0LTMuNzEzLTMuNzEyek0xNS42MDcgNS4wNGEuNzUuNzUgMCAwIDEgMCAxLjA2bC0xLjA2IDEuMDYxLTMuNzEzLTMuNzEyIDEuMDYtMS4wNmEuNzUuNzUgMCAwIDEgMS4wNiAwbDIuNjUzIDIuNjUxeiIvPgogICAgPC9nPgo8L3N2Zz4K" />
                  수정
                </button>
                <div className={styles.virtualLineBox}>
                  <div className={styles.virtualLine}></div>
                </div>
                <button
                  onClick={() => {
                    deleteCommentRequest(my_comment.id, accessToken ?? "")
                      .then(() => {
                        setContent({ ...content, my_comment: null }); // 성공 여부를 보고 반영
                        console.log("코멘트가 삭제되었습니다.");
                        closeModal();
                      })
                      .catch(() => {
                        alert("코멘트 삭제에 실패했습니다.");
                      });
                  }}
                >
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZmlsbD0iI0EwQTBBMCIgZD0iTTUuMjUgMTQuMjVoNy41di03LjVoMS41VjE1YS43NS43NSAwIDAgMS0uNzUuNzVoLTlhLjc1Ljc1IDAgMCAxLS43NS0uNzVWNi43NWgxLjV2Ny41ek0xMiA0LjVoMy43NVY2SDIuMjVWNC41SDZWM2EuNzUuNzUgMCAwIDEgLjc1LS43NWg0LjVBLjc1Ljc1IDAgMCAxIDEyIDN2MS41em0tMS41IDB2LS43NWgtM3YuNzVoM3pNNi43NSA2Ljc1aDEuNXY2Ljc1aC0xLjVWNi43NXptMyAwaDEuNXY2Ljc1aC0xLjVWNi43NXoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" />
                  삭제
                </button>
              </div>
            </div>
          </div>
        ) : (
          myRate > 0 && (
            <div className={styles.commentCon}>
              <div className={styles.commentBox}>
                <div className={styles.commentText}>{message}</div>
                <button
                  className={styles.commentCreateBtn}
                  onClick={() => {
                    accessToken && openModal("createComment");
                  }}
                >
                  코멘트 남기기
                </button>
              </div>
            </div>
          )
        )}
      </>
    )
  );
}
