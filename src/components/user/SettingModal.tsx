import styles from "./SettingModal.module.scss";
import { CurrentModalType } from "../../pages/Layout";
import { logoutRequest, withDrawalUserRequest } from "../../apis/auth";
import { defaultHandleResponse } from "../../apis/custom";
import { useAuthContext } from "../../contexts/authContext";
type SettingModalProps = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

export default function SettingModal({ setCurrentModal }: SettingModalProps) {
  const { accessToken } = useAuthContext();
  return (
    <div
      className={styles.modalContainer}
      onClick={() => {
        setCurrentModal(null);
      }}
    >
      <div
        className={styles.modalBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            logoutRequest()
              .then(defaultHandleResponse)
              .then(() => {
                window.location.reload();
              })
              .catch((e) => {
                console.log(e);
                alert("로그아웃 실패");
              });
          }}
        >
          로그아웃
        </button>
        <button
          onClick={() => {
            withDrawalUserRequest(accessToken ? accessToken : "")
              .then(defaultHandleResponse)
              .then(() => {
                return logoutRequest(); //회원탈퇴 후에 서버 쪽에서 리프레시 토큰을 따로 블랙리스트화 하지 않아서 강제로그아웃
              })
              .then(defaultHandleResponse)
              .then(() => {
                alert("회원탈퇴 성공");
                window.location.reload();
              })
              .catch((e) => {
                console.log(e);
                alert("로그아웃 실패");
              });
          }}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
