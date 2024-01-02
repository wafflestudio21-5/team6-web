import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const searchParams = useSearchParams()[0];
  const query = searchParams.get("query");
  return <div>"{query}"에 대한 검색결과</div>;
}
