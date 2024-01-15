import styles from "./CommentPage.module.scss";
import CommentInfo from "../components/CommentInfo";

export default function CommentPage() {
  const comment = {
    userName: "이동진",
    movie: {
      name: "오펜하이머",
      releaseYear: "2023",
      country: "영국",
      posterUrl:
        "https://an2-img.amz.wtchn.net/image/v2/TnfLooyFVulaY3fZhLMNIw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9UQTFNRFk1TWpBNU9ERTVNamt5TkRNaWZRLmdfM0lvai1JZGVCbjVFRXhYQ3VFODMwdEN4MnNEa2JKbXV4VEk3QlJPYVE",
      rating: 4.0,
    },
    rating: 4.5,
    date: new Date("2024-01-15 12:00"),
    content: `줄리어스 로버트 오펜하이머..
    줄리어스 로버트 오펜하이머..
    자기 이야기가 영화로 만들어진다니.
    로버트는 얼마나 좋았을까.
        `,
    likes: 1000,
    replies: [],
  };

  return (
    <section className={styles.commentPage}>
      <CommentInfo comment={comment} />
    </section>
  );
}
