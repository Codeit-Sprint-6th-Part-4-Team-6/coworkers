import Image from "next/image";
import Link from "next/link";
import NameTag from "@components/commons/NameTag";
import { formatDate } from "@utils/formatDate";
import { IconBestBadge, IconComment, IconHeart } from "@utils/icon";

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

export default function BestArticleCard({ item }: { item: List }) {
  return (
    <Link key={item.id} href={`/board/${item.id}`} className="w-full">
      <div className="flex h-169 flex-col justify-between rounded-8 bg-[#1E293B] p-14 pb-10">
        <IconBestBadge />
        <div className="flex justify-between">
          <span className="text-18 font-[500] text-[#CBD5E1]">{item.title}</span>
          {item.image && <Image width={72} height={72} alt="image" src={item.image} />}
        </div>
        <span className="text-14 font-[500] text-[#94A3B8]">{formatDate(item.createdAt)}</span>
        <div className="flex items-center justify-between">
          <NameTag type="default-12" image={null} name={item.writer.nickname} />
          <div className="flex gap-12">
            <div className="flex items-center justify-center gap-5">
              <IconComment />
              {/* NOTE: 댓글 수 표기가 안돼서 일단 좋아요갯수로 테스트해봄 */}
              <span className="text-14 font-[400] text-[#94A3B8]">{item.likeCount}</span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <IconHeart />
              <span className="text-14 font-[400] text-[#94A3B8]">{item.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
