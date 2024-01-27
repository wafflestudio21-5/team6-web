import styles from "./SettingModal.module.scss";
import { CurrentModalType } from "../../pages/Layout";
import { postLogout, deleteWithDrawalUser } from "../../apis/auth";
import { defaultResponseHandler } from "../../apis/custom";
import { useAuthContext } from "../../contexts/authContext";
import { useState } from "react";
type SettingModalProps = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

export default function SettingModal({ setCurrentModal }: SettingModalProps) {
  const [alertMessage, setAlertMessage] = useState<
    "logoutAlert" | "withdrawalAlert" | "clipboard" | null
  >(null);

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
        {alertMessage === "logoutAlert" && (
          <LogoutAlertBoxContainer setAlertMessage={setAlertMessage} />
        )}
        {alertMessage === "withdrawalAlert" && (
          <WithdrawalAlertBoxContainer setAlertMessage={setAlertMessage} />
        )}
        {alertMessage === "clipboard" && (
          <ClipboardAlertBoxContainer setAlertMessage={setAlertMessage} />
        )}
        <header>
          <div className={styles.cancelButtonContainer}>
            <button
              onClick={() => {
                setCurrentModal(null);
              }}
            />
          </div>
          <div className={styles.titleContainer}>설정</div>
        </header>
        <section className={styles.settingsSection}>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(window.location.href);
              setAlertMessage("clipboard");
            }}
          >
            <span>프로필 공유</span>
          </button>
          <button
            onClick={() => {
              setAlertMessage("logoutAlert");
            }}
          >
            <span>로그아웃</span>
          </button>
          <button
            onClick={() => {
              setAlertMessage("withdrawalAlert");
            }}
          >
            <span> 탈퇴하기</span>
          </button>
        </section>
      </div>
    </div>
  );
}

type ButtonBoxProps = {
  setAlertMessage: (
    alertMessage: "logoutAlert" | "withdrawalAlert" | "clipboard" | null,
  ) => void;
};

function LogoutAlertBoxContainer({ setAlertMessage }: ButtonBoxProps) {
  return (
    <div
      className={styles.alertBoxContainer}
      onClick={() => {
        setAlertMessage(null);
      }}
    >
      <div
        className={styles.alertBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>정말로 로그아웃 하시겠습니까?</p>
        <div className={styles.buttonBox}>
          <button
            onClick={() => {
              setAlertMessage(null);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              postLogout()
                .then(defaultResponseHandler)
                .then(() => {
                  window.location.reload();
                })
                .catch((e) => {
                  console.log(e);
                  alert("로그아웃 실패");
                });
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function WithdrawalAlertBoxContainer({ setAlertMessage }: ButtonBoxProps) {
  const { accessToken } = useAuthContext();
  return (
    <div
      className={styles.alertBoxContainer}
      onClick={() => {
        setAlertMessage(null);
      }}
    >
      <div
        className={styles.alertBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>정말로 회원을 탈퇴하시겠습니까?</p>
        <div className={styles.buttonBox}>
          <button
            onClick={() => {
              setAlertMessage(null);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              deleteWithDrawalUser(accessToken ? accessToken : "")
                .then(defaultResponseHandler)
                .then(() => {
                  return postLogout(); //회원탈퇴 후에 서버 쪽에서 리프레시 토큰을 따로 블랙리스트화 하지 않아서 강제로그아웃
                })
                .then(defaultResponseHandler)
                .then(() => {
                  alert("회원탈퇴 성공");
                  window.location.href = "/";
                })
                .catch((e) => {
                  console.log(e);
                  alert("로그아웃 실패");
                });
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function ClipboardAlertBoxContainer({ setAlertMessage }: ButtonBoxProps) {
  return (
    <div
      className={styles.alertBoxContainer}
      onClick={() => {
        setAlertMessage(null);
      }}
    >
      <div
        className={styles.alertBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>프로필 링크가 복사되었습니다.</p>
        <div className={styles.buttonBox}>
          <button
            onClick={() => {
              setAlertMessage(null);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
