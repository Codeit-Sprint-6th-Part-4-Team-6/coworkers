import Link from "next/link";
import Button from "@components/commons/Button";
import Label from "@components/commons/Label";
import BestArticleCard from "./BestArticlesCard";

interface List {
  id: number;
  title: string;
  image: null;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  likeCount: number;
}

interface Writer {
  id: number;
  nickname: string;
}

export default function BestArticle({ Posts }: { Posts: List[] }) {
  return (
    <div className="mx-0 my-auto flex w-full flex-col gap-12">
      <div className="flex items-center justify-between">
        <Label content="베스트 게시글" />
        <Link href="/addBoard">
          <Button size="small">글쓰기</Button>
        </Link>
      </div>
      <div className="flex gap-24">
        {Posts.map((item) => (
          <BestArticleCard item={item} />
        ))}
      </div>
    </div>
  );
}
