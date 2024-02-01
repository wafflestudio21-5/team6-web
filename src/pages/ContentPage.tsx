import { useParams } from "react-router-dom";
import Content from "../components/Content";
import styles from "./ContentPage.module.scss";
import { useEffect, useState } from "react";
import { MovieType } from "../type";
import { getContentRequest } from "../apis/content";
import { defaultResponseHandler } from "../apis/custom";
import { useAuthContext } from "../contexts/authContext";
import useChangeTitle from "../hooks/useChangeTitle";
import useRecentContents from "../hooks/useRecentContents";

export default function ContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState<MovieType | null>(null);
  const { accessToken } = useAuthContext();

  const { setTitle } = useChangeTitle();
  const [refetch, setRefetch] = useState(false);
  const refetchContent = () => setRefetch(!refetch);
  const { addRecentContent } = useRecentContents();

  useEffect(() => {
    id &&
      getContentRequest(id, accessToken ?? undefined)
        .then(defaultResponseHandler)
        .then((content: MovieType) => {
          setTitle(content.title_ko + " - 와플피디아");
          setContent(content);
        })
        .catch(() => {
          alert("잘못된 요청입니다");
        });
  }, [id, accessToken, setTitle, refetch]);

  // 최근조회영화 목록에 추가
  useEffect(() => {
    content && addRecentContent(content);
  }, [id, content]);

  return (
    <div className={styles.container}>
      {content && (
        <>
          <Content.Header content={content} />

          <Content.Panel
            content={content}
            setContent={setContent}
            refetchContent={refetchContent}
          />

          <Content.Cast content={content} />
          <Content.Comments content={content} />
        </>
      )}
    </div>
  );
}
