import styles from "./ContentList.module.scss";

export type MovieType = {
  name: string;
  releaseYear: string;
  country: string;
  posterUrl: string;
  rating: number;
};

export type ContentListProps = {
  title: string;
  contents: MovieType[];
};

function ContentCell(content: MovieType) {
  return <li>{content.name}</li>;
}

export default function ContentList({ title, contents }: ContentListProps) {
  return (
    <div className={styles.contentList}>
      <p>{title}</p>
      <div>
        <ul>{contents.map((content: MovieType) => ContentCell(content))}</ul>
      </div>
    </div>
  );
}
