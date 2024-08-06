import { useState } from "react";
import { GetServerSideProps } from "next";
import BestArticle from "@components/board/BestArticle";
import { axiosInstance } from "../api/axios";

interface RootObject {
  list: List[];
  totalCount: number;
}

interface BoardProps {
  data: RootObject;
}

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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axiosInstance.get("/articles?&pageSize=999");
    const data: RootObject = res.data ?? "";

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: "",
      },
    };
  }
};

export default function BoardPage({ data }: BoardProps) {
  const [articles, setArticles] = useState<List[]>(data.list);

  const sortedArticles = [...articles].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);

  return (
    <div className="mx-auto my-0 w-full min-w-368 max-w-1200 px-34 py-0">
      <BestArticle Posts={sortedArticles} />
    </div>
  );
}
