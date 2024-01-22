import { useParams } from "react-router-dom";
import Content from "../components/Content";
import styles from "./ContentPage.module.scss";
import { useEffect, useState } from "react";
import { ContentType } from "../type";
// import { convertKeysToCamelCase } from "../utils/snackToCamel";
import { getContentRequest } from "../apis/content";
import { defaultResponseHandler } from "../apis/custom";
import { useAuthContext } from "../contexts/authContext";

export default function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState<ContentType | null>(null);
  const { accessToken } = useAuthContext();
  useEffect(() => {
    console.log("accesstoken", accessToken);
    id &&
      getContentRequest(id, accessToken ? accessToken : undefined)
        .then(defaultResponseHandler)
        .then((content) => {
          console.log(content);
          setContent(content);
        })
        .catch(() => alert("잘못된 영화CD입니다"));
  }, [id]);

  return (
    <div className={styles.container}>
      {content && (
        <>
          <Content.Header content={content} />
          <Content.Panel content={content} />
          <Content.Cast content={content} />
          <Content.Comments content={content} />
        </>
      )}
    </div>
  );
}
