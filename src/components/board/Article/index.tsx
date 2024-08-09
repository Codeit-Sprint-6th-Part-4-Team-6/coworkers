import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import ArticleCard from "./ArticleCard";

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

export default function Article({
  Posts,
  searchValue,
  searchChange,
  onEnter,
}: {
  Posts: List[];
  searchValue: string;
  searchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-30">
      <div className="mb-12 flex w-full items-center justify-between gap-30">
        <Label content="게시글" className="w-100" />
        <Input
          value={searchValue}
          onChange={searchChange}
          onKeyDown={onEnter}
          type="search"
          name="search"
          placeholder="검색할 게시글을 입력해주세요."
          className="flex w-600 items-center justify-center"
        />
        {/* 정렬 */}
        <div className="text-[#fff]">테스트 정렬</div>
      </div>
      <div className="flex flex-col">
        {Posts.map((post) => (
          <div key={post.id}>
            <ArticleCard Posts={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
