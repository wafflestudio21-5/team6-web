import { useEffect, useState } from "react";
import validatePassword from "../utils/validatePassword";
import Logo from "../assets/logo.svg";
import styles from "./SignupModal.module.scss";
import { CurrentModalType } from "../pages/Layout";
import { postLogin, postSignup } from "../apis/auth";
import { useAuthContext } from "../contexts/authContext";
import { defaultResponseHandler } from "../apis/custom";

type SignupModalProps = {
  setCurrentModal: (currentModal: CurrentModalType) => void;
};

export default function SignupModal({ setCurrentModal }: SignupModalProps) {
  const [nameInput, setNameInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [passwordInput2, setPasswordInput2] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false); // 회원가입 성공 여부
  const { setAccessToken } = useAuthContext();
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
      !passwordInput1 ||
      !validatePassword(passwordInput1) ||
      passwordInput1.includes(" ")
        ? "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 최소 10자리 이상이여야 합니다."
        : "",
  };
  const isAllInputsValid = !error.name && !error.id && !error.password; // input이 모두 유효한지 확인

  const signupHandler = () =>
    isAllInputsValid &&
    postSignup(nameInput, idInput, passwordInput1, passwordInput2)
      .then((res) => {
        if (!res.ok) {
          console.log(res); // res.json()에 에러 메시지가 담겨 있음
        }
        return res.json();
      })
      .then((data) => {
        if ("access" in data) {
          setIsSignupSuccess(true);
          return;
        }
        if ("username" in data && data.username[0].includes("already exists")) {
          setAuthErrorMessage("이미 존재하는 아이디입니다.");
        } else if (
          "non_field_errors" in data &&
          data.non_field_errors[0].includes("didn't match.")
        ) {
          setAuthErrorMessage("두 비밀번호를 동일하게 입력해주세요.");
        } else if (
          "non_field_errors" in data &&
          data.non_field_errors[0].includes("too similar")
        ) {
          setAuthErrorMessage("아이디와 비밀번호가 매우 유사합니다.");
        } else {
          setAuthErrorMessage("예상치 못한 오류가 발생하였습니다.");
        }
      })
      .catch(() => {
        setAuthErrorMessage("예상치 못한 오류가 발생하였습니다.");
      });

  const authHandler = async () => {
    return (
      isSignupSuccess &&
      postLogin(idInput, passwordInput1)
        .then(defaultResponseHandler)
        .then((data) => {
          setAccessToken(data.access);
          setCurrentModal(null);
        })
        .catch((e) => {
          alert(e);
        })
    );
  };

  useEffect(() => {
    authHandler();
  }, [isSignupSuccess]); // 회원가입 시 자동 로그인

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
        <h2>회원가입</h2>
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupHandler();
            }}
          >
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
                !error.password || !passwordInput1
                  ? styles.validLabel
                  : styles.invalidLabel
              }`}
            >
              <input
                autoComplete="off"
                placeholder="비밀번호"
                type="password"
                value={passwordInput1}
                onChange={(e) => setPasswordInput1(e.target.value)}
              />
              {!!passwordInput1 && (
                <div
                  className={styles.inputClearIcon}
                  onClick={() => setPasswordInput1("")}
                />
              )}
              {!!passwordInput1 && (
                <div className={styles.validationIconBox}>
                  <div
                    className={`${styles.validationIcon} ${
                      !error.password ? styles.validIcon : styles.invalidIcon
                    }`}
                  />
                </div>
              )}
            </label>

            {!!passwordInput1 && (
              <p className={styles.errorMessage}>{error.password}</p>
            )}

            <label
              className={`${
                !error.password || !passwordInput2
                  ? styles.validLabel
                  : styles.invalidLabel
              }`}
            >
              <input
                autoComplete="off"
                placeholder="비밀번호 확인"
                type="password"
                value={passwordInput2}
                onChange={(e) => setPasswordInput2(e.target.value)}
              />
            </label>

            <button type="submit" disabled={!isAllInputsValid}>
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
