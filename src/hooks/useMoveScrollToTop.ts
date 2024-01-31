import { useEffect } from "react";

export default function useMoveScrollToTop() {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);
}
