import styles from "./MainPage.module.scss";
import ContentList, { ContentListProps } from "../components/ContentList";

export default function MainPage() {
  const props = [
    {
      title: "박스오피스 순위",
      order: "box-office",
    },
    {
      title: "최신 영화",
      order: "latest",
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
