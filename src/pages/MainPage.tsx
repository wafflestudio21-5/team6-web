import styles from "./MainPage.module.scss";
import ContentList, { ContentListProps } from "../components/ContentList";
import useMoveScrollToTop from "../hooks/useMoveScrollToTop";

export default function MainPage() {
  useMoveScrollToTop();
  const props = [
    {
      title: "박스오피스 순위",
      order: "box-office",
    },
    {
      title: "최신 영화",
      order: "latest",
    },
    {
      title: "🧇 TEAM6's PICK",
      order: "recommend",
    },
  ];
  return (
    <section className={styles.mainSection}>
      {props.map((prop: ContentListProps, index: number) => (
        <ContentList key={index} title={prop.title} order={prop.order} />
      ))}
    </section>
  );
}
