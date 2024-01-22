import { useParams } from "react-router-dom";
import Content from "../components/Content";
import styles from "./ContentPage.module.scss";
import { useEffect, useState } from "react";
import { ContentType } from "../type";
import { convertKeysToCamelCase } from "../utils/snackToCamel";
import { getContentRequest } from "../apis/content";
import { defaultHandleResponse } from "../apis/custom";

export default function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState<ContentType | null>(null);

  useEffect(() => {
    id &&
      getContentRequest(id)
        .then(defaultHandleResponse)
        .then((content) => setContent(convertKeysToCamelCase(content)))
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
