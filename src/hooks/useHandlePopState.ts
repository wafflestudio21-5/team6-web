import { useEffect } from "react";

// 모달이 열렸을 때, 브라우저 뒤로가기 이벤트 시 모달이 닫히도록 구현할 때 사용
export default function useHandlePopState(handlePopState: () => void) {
  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, document.title, window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
}
