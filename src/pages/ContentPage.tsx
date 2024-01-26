import { useParams } from "react-router-dom";
import Content from "../components/Content";
import styles from "./ContentPage.module.scss";
import { useEffect, useState } from "react";
import { MovieType } from "../type";
// import { convertKeysToCamelCase } from "../utils/snackToCamel";
import { getContentRequest } from "../apis/content";
import { defaultResponseHandler } from "../apis/custom";
import { useAuthContext } from "../contexts/authContext";

export default function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState<MovieType | null>(null);
  const { accessToken } = useAuthContext();

  useEffect(() => {
    id &&
      getContentRequest(id, accessToken ?? undefined)
        .then(defaultResponseHandler)
        .then((content) => {
          console.log(content);
          setContent(content);
        })
        .catch(() => {
          alert("잘못된 요청입니다");
        });
  }, [id, accessToken]);

  return (
    <div className={styles.container}>
      {content && (
        <>
          <Content.Header content={content} />
          <Content.Panel content={content} setContent={setContent} />
          <Content.Cast content={content} />
          <Content.Comments content={content} />
        </>
      )}
    </div>
  );
}
