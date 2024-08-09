import Image from "next/image";
import Link from "next/link";
import NameTag from "@components/commons/NameTag";
import { formatDate } from "@utils/formatDate";
import { IconComment, IconHeart } from "@utils/icon";

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

export default function ArticleCard({ Posts }: { Posts: List }) {
  return (
    <Link href={`/board/${Posts.id}`}>
      <div className="mb-24 flex h-176 w-full flex-col justify-between rounded-8 bg-[#1E293B] p-24">
        <div>
          <span className="text-18 font-[500] text-text-secondary">{Posts.title}</span>
          <div>
            {Posts.image && <Image width={72} height={72} alt="image" src={Posts.image} />}
            {/* 드롭다운 부분 */}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-12">
            <NameTag type="default-12" image={null} name={Posts.writer.nickname} />
            <div className="h- border-l border-solid border-background-tertiary pl-12">
              <span className="text-14 font-[500] text-text-disabled">
                {formatDate(Posts.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-12">
            <div className="flex items-center justify-center gap-5">
              <IconComment />
              {/* NOTE: 댓글 수 표기가 안돼서 일단 좋아요갯수로 테스트해봄 */}
              <span className="text-14 font-[400] text-[#94A3B8]">{Posts.likeCount}</span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <IconHeart />
              <span className="text-14 font-[400] text-[#94A3B8]">{Posts.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
