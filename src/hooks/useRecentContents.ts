import { MovieType } from "../type";

export default function useRecentContents() {
  let recentContents: Partial<MovieType>[];
  try {
    recentContents = JSON.parse(localStorage.getItem("recentContents") ?? "[]");
  } catch (e) {
    localStorage.removeItem("recentContents");
    recentContents = [];
  }

  function addRecentContent(newContent: Partial<MovieType>) {
    recentContents = recentContents.filter(
      (content) => content.movieCD !== newContent.movieCD,
    );
    recentContents.push(newContent);
    recentContents.length > 10 && recentContents.splice(0, 1);

    localStorage.setItem("recentContents", JSON.stringify(recentContents));
  }

  // 순서를 뒤집어 return
  return { recentContents: recentContents.reverse(), addRecentContent };
}
