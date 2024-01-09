import styles from "./MainPage.module.scss";
import ContentList, { ContentListProps } from "../components/ContentList";

export default function MainPage() {
  const props = [
    {
      title: "박스오피스 순위",
      contents: new Array(30).fill({
        name: "오펜하이머",
        releaseYear: 2023,
        country: "영국",
        posterUrl:
          "https://an2-img.amz.wtchn.net/image/v2/TnfLooyFVulaY3fZhLMNIw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk9UQTFNRFk1TWpBNU9ERTVNamt5TkRNaWZRLmdfM0lvai1JZGVCbjVFRXhYQ3VFODMwdEN4MnNEa2JKbXV4VEk3QlJPYVE",
        rating: 4.0,
      }),
    },
    {
      title: "최신 영화",
      contents: [],
    },
  ];
  return (
    <section className={styles.mainSection}>
      {props.map((prop: ContentListProps) => (
        <ContentList title={prop.title} contents={prop.contents} />
      ))}
    </section>
  );
}
