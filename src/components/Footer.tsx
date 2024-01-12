import styles from "./Footer.module.scss";

export default function Footer() {
  const comments = 999999999;
  return (
    <footer>
      <section className={styles.commentNumber}>
        <span>
          지금까지 <em>★{comments.toLocaleString("ko-KR")} 개의</em> 평가가
          쌓였어요.
        </span>
      </section>
    </footer>
  );
}
