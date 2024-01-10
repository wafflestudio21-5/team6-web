// import { useParams } from "react-router-dom";
import Content from "../components/Content";
import styles from "./ContentPage.module.scss";

export default function ContentPage() {
  // const { id } = useParams();

  return (
    <div className={styles.container}>
      <Content.Header />
      <Content.Panel />
      <Content.Cast />
      <Content.Comments />
    </div>
  );
}
