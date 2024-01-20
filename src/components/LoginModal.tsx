import { useState } from "react";
import Logo from "../assets/logo.svg";
import styles from "./LoginModal.module.scss";
import { CurrentModalType } from "../pages/Layout";
import { loginRequest } from "../apis/auth";
import { useAuthContext } from "../contexts/authContext";
import { defaultHandleResponse } from "../apis/custom";

type LoginModalProps = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

export default function LoginModal({ setCurrentModal }: LoginModalProps) {
  const { setAccessToken } = useAuthContext();
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const error = {
    id:
      idInput.length < 2 || idInput.length > 20 || idInput.includes(" ")
        ? "정확하지 않은 아이디입니다."
        : "",
    password:
      passwordInput.length < 10 || passwordInput.includes(" ")
        ? "비밀번호는 공백이 없는 10자리 이상이어야 합니다."
        : "",
  };
  const isAllInputsValid = !error.id && !error.password; // input이 모두 유효한지 확인

  const authHandler = async () => {
    return (
      isAllInputsValid &&
      !authErrorMessage &&
      loginRequest(idInput, passwordInput)
        .then(defaultHandleResponse)
        .then((data) => {
          setAccessToken(data.access);
          setCurrentModal(null);
        })
        .catch((e) => {
          console.log(e);
          if (e.message === "401") {
            setAuthErrorMessage("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
          } else {
            setAuthErrorMessage(
              "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요",
            );
          }
        })
    );
  };

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
        {!!authErrorMessage && (
          <div
            className={styles.authErrorBoxContainer}
            onClick={() => {
              setAuthErrorMessage(null);
            }}
          >
            <div
              className={styles.authErrorBox}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p> {authErrorMessage}</p>
              <button
                onClick={() => {
                  setAuthErrorMessage(null);
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
        <img
          src={Logo}
          className={styles.watchaPediaLogo}
          alt="watchaPediaLogo"
        />
        <h2>로그인</h2>
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              authHandler();
            }}
          >
            <label
              className={`${
                !error.id || !idInput ? styles.validLabel : styles.invalidLabel
              }`}
            >
              <input
                autoComplete="off"
                placeholder="아이디"
                type="text"
                value={idInput}
                onChange={(e) => {
                  setIdInput(e.target.value);
                }}
              />
              {!!idInput && (
                <div
                  className={styles.inputClearIcon}
                  onClick={() => setIdInput("")}
                />
              )}
              {!!idInput && (
                <div className={styles.validationIconBox}>
                  <div
                    className={`${styles.validationIcon} ${
                      !error.id ? styles.validIcon : styles.invalidIcon
                    }`}
                  />
                </div>
              )}
            </label>

            {!!idInput && <p className={styles.errorMessage}>{error.id}</p>}

            <label
              className={`${
                !error.password || !passwordInput
                  ? styles.validLabel
                  : styles.invalidLabel
              }`}
            >
              <input
                autoComplete="off"
                placeholder="비밀번호"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              {!!passwordInput && (
                <div
                  className={styles.inputClearIcon}
                  onClick={() => setPasswordInput("")}
                />
              )}
              {!!passwordInput && (
                <div className={styles.validationIconBox}>
                  <div
                    className={`${styles.validationIcon} ${
                      !error.password ? styles.validIcon : styles.invalidIcon
                    }`}
                  />
                </div>
              )}
            </label>

            {!!passwordInput && (
              <p className={styles.errorMessage}>{error.password}</p>
            )}

            <button type="submit" disabled={!isAllInputsValid}>
              로그인
            </button>
          </form>
          <div className={styles.toSignUpModalBox}>
            계정이 없으신가요?{" "}
            <button
              onClick={() => {
                setCurrentModal("signup");
              }}
            >
              회원가입
            </button>
          </div>
          <div className={styles.divisionLine}>
            <span>OR</span>
          </div>
          <ul className={styles.socialLoginButtonList}>
            <li>
              <button
                className={styles.kakaoLoginButton}
                onClick={() => {
                  window.open(
                    "/auth/toKakao",
                    "_blank",
                    "width=350,height=600",
                  );
                }}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuMDM5NCAxOC4zQzE3LjAzMTggMTguMyAyMS4wNzg5IDE1LjA5ODggMjEuMDc4OSAxMS4xNUMyMS4wNzg5IDcuMjAxMTYgMTcuMDMxOCA0IDEyLjAzOTQgNEM3LjA0NzA5IDQgMyA3LjIwMTE2IDMgMTEuMTVDMyAxMy43MjQ5IDQuNzIwNzUgMTUuOTgxOSA3LjMwMjI5IDE3LjI0MDdDNy4wMzYwNyAxOC4zNTU0IDYuNTY4NTUgMjAuMzE5OCA2LjU1MTQ3IDIwLjQzODVDNi41Mjc1NCAyMC42MDQ4IDYuNzE5MjUgMjAuNzQwNiA2Ljg4NzU4IDIwLjYyNTFDNy4wMTA1IDIwLjU0MDggOS4yNTI5NSAxOS4wMTAyIDEwLjQ1NDEgMTguMTkwNEMxMC45Njg4IDE4LjI2MjQgMTEuNDk4NiAxOC4zIDEyLjAzOTQgMTguM1oiIGZpbGw9IiMzQzFFMUUiLz4KPC9zdmc+Cg=="
                  alt="kakaoLoginButton"
                />
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
