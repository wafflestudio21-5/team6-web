import { useState } from "react";
import validatePassword from "../utils/validatePassword";
import Logo from "../assets/logo.svg";
import styles from "./AuthModalStyle.module.scss";
import { CurrentModalType } from "../pages/Layout";
import { signupRequest } from "../apis/auth";

type SignupModalProps = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

export default function SignupModal({ setCurrentModal }: SignupModalProps) {
  const [nameInput, setNameInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const error = {
    name:
      nameInput.length < 2 || nameInput.length > 20 || nameInput.includes(" ")
        ? "정확하지 않은 이름입니다."
        : "",
    id:
      idInput.length < 2 || idInput.length > 20 || idInput.includes(" ")
        ? "정확하지 않은 아이디입니다."
        : "",
    password:
      !passwordInput ||
      !validatePassword(passwordInput) ||
      passwordInput.includes(" ")
        ? "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 최소 10자리 이상이여야 합니다."
        : "",
  };
  const isAllInputsValid = !error.name && !error.id && !error.password; // input이 모두 유효한지 확인

  return (
    <div
      className={styles.modalContainer}
      onClick={() => setCurrentModal(null)}
    >
      <div
        className={styles.modalBox}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={Logo}
          className={styles.watchaPediaLogo}
          alt="watchaPediaLogo"
        />
        <h2>회원가입</h2>
        <section>
          <form action="#">
            <label
              className={`${
                !error.name || !nameInput
                  ? styles.validLabel
                  : styles.invalidLabel
              }`}
            >
              <input
                autoComplete="off"
                placeholder="이름"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              {!!nameInput && (
                <div
                  className={styles.inputClearIcon}
                  onClick={() => setNameInput("")}
                />
              )}
              {!!nameInput && (
                <div className={styles.validationIconBox}>
                  <div
                    className={`${styles.validationIcon} ${
                      !error.name ? styles.validIcon : styles.invalidIcon
                    }`}
                  />
                </div>
              )}
            </label>

            {!!nameInput && <p className={styles.errorMessage}>{error.name}</p>}

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

            <button
              type="button"
              disabled={!isAllInputsValid}
              onClick={() => {
                alert("회원가입");
                signupRequest("test", "test", "test")
                  .then((data) => {
                    console.log("성공");
                    alert(data);
                  })
                  .catch((e) => {
                    console.log("실패");
                    console.log("e : ", e);
                    alert("회원가입에 실패했습니다.");
                  });
              }}
            >
              회원가입
            </button>
          </form>
          <div className={styles.toLoginModalBox}>
            이미 가입하셨나요?{" "}
            <button
              onClick={() => {
                setCurrentModal("login");
              }}
            >
              로그인
            </button>
          </div>
          <div className={styles.divisionLine}>
            <span>OR</span>
          </div>
          <ul className={styles.socialLoginButtonList}>
            <li>
              <button className={styles.kakaoLoginButton}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuMDM5NCAxOC4zQzE3LjAzMTggMTguMyAyMS4wNzg5IDE1LjA5ODggMjEuMDc4OSAxMS4xNUMyMS4wNzg5IDcuMjAxMTYgMTcuMDMxOCA0IDEyLjAzOTQgNEM3LjA0NzA5IDQgMyA3LjIwMTE2IDMgMTEuMTVDMyAxMy43MjQ5IDQuNzIwNzUgMTUuOTgxOSA3LjMwMjI5IDE3LjI0MDdDNy4wMzYwNyAxOC4zNTU0IDYuNTY4NTUgMjAuMzE5OCA2LjU1MTQ3IDIwLjQzODVDNi41Mjc1NCAyMC42MDQ4IDYuNzE5MjUgMjAuNzQwNiA2Ljg4NzU4IDIwLjYyNTFDNy4wMTA1IDIwLjU0MDggOS4yNTI5NSAxOS4wMTAyIDEwLjQ1NDEgMTguMTkwNEMxMC45Njg4IDE4LjI2MjQgMTEuNDk4NiAxOC4zIDEyLjAzOTQgMTguM1oiIGZpbGw9IiMzQzFFMUUiLz4KPC9zdmc+Cg=="
                  alt="kakaoLoginButton"
                />
              </button>
            </li>
            <li>
              <button className={styles.googleLoginButton}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAuNjQgMTIuMjA0MkMyMC42NCAxMS41NjYgMjAuNTgyNyAxMC45NTI0IDIwLjQ3NjQgMTAuMzYzM0gxMlYxMy44NDQ2SDE2Ljg0MzZDMTYuNjM1IDE0Ljk2OTYgMTYuMDAwOSAxNS45MjI4IDE1LjA0NzcgMTYuNTYxVjE4LjgxOTJIMTcuOTU2NEMxOS42NTgyIDE3LjI1MjQgMjAuNjQgMTQuOTQ1MSAyMC42NCAxMi4yMDQyVjEyLjIwNDJaIiBmaWxsPSIjNDI4NUY0Ii8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjk5OTggMjFDMTQuNDI5OCAyMSAxNi40NjcgMjAuMTk0MSAxNy45NTYxIDE4LjgxOTVMMTUuMDQ3NSAxNi41NjEzQzE0LjI0MTYgMTcuMTAxMyAxMy4yMTA3IDE3LjQyMDQgMTEuOTk5OCAxNy40MjA0QzkuNjU1NjcgMTcuNDIwNCA3LjY3MTU4IDE1LjgzNzIgNi45NjM4NSAxMy43MUgzLjk1NzAzVjE2LjA0MThDNS40Mzc5NCAxOC45ODMxIDguNDgxNTggMjEgMTEuOTk5OCAyMVYyMVoiIGZpbGw9IiMzNEE4NTMiLz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNi45NjQwOSAxMy43MDk4QzYuNzg0MDkgMTMuMTY5OCA2LjY4MTgyIDEyLjU5MyA2LjY4MTgyIDExLjk5OThDNi42ODE4MiAxMS40MDY2IDYuNzg0MDkgMTAuODI5OCA2Ljk2NDA5IDEwLjI4OThWNy45NTgwMUgzLjk1NzI3QzMuMzQ3NzMgOS4xNzMwMSAzIDEwLjU0NzYgMyAxMS45OTk4QzMgMTMuNDUyMSAzLjM0NzczIDE0LjgyNjYgMy45NTcyNyAxNi4wNDE2TDYuOTY0MDkgMTMuNzA5OFYxMy43MDk4WiIgZmlsbD0iI0ZCQkMwNSIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4wNDI3IDYuNTc5NTVDMTMuMzY0MSA2LjU3OTU1IDE0LjU1MDUgNy4wMzM2NCAxNS40ODMyIDcuOTI1NDVMMTguMDY0NSA1LjM0NDA5QzE2LjUwNTkgMy44OTE4MiAxNC40Njg2IDMgMTIuMDQyNyAzQzguNTI0NTUgMyA1LjQ4MDkxIDUuMDE2ODIgNCA3Ljk1ODE4TDcuMDA2ODIgMTAuMjlDNy43MTQ1NSA4LjE2MjczIDkuNjk4NjQgNi41Nzk1NSAxMi4wNDI3IDYuNTc5NTVWNi41Nzk1NVoiIGZpbGw9IiNFQTQzMzUiLz4KPC9zdmc+Cg=="
                  alt="googleLoginButton"
                />
              </button>
            </li>
            <li>
              <button className={styles.naverLoginButton}></button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
