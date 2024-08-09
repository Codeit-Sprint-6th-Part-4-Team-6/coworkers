import { useEffect, useState } from "react";
import {
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Article from "@components/board/Article";
import BestArticle from "@components/board/BestArticle";
import Pagination from "@components/board/pagination";
import { axiosInstance } from "@api/axios";

interface RootObject {
  list: List[];
  totalCount: number;
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

const getArticle = async (page: number, orderBy: string = "recent", keyword: string = "") => {
  const res = await axiosInstance.get("/articles", {
    params: {
      page,
      pageSize: 1,
      orderBy,
      keyword,
    },
  });
  return res.data;
};

const getSortedArticles = async () => {
  const res = await axiosInstance.get(`/articles?page=1&pageSize=3&orderBy=like`);
  return res.data.list;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { query } = context;
  const page = parseInt(query.page as string, 10) || 1;
  const orderBy = (query.orderBy as string) || "recent";
  const keyword = (query.keyword as string) || "";

  await queryClient.prefetchQuery({
    queryKey: ["articles", page, orderBy, keyword],
    queryFn: () => getArticle(page, orderBy, keyword),
  });
  await queryClient.prefetchQuery({ queryKey: ["sortedArticles"], queryFn: getSortedArticles });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function BoardPage() {
  const router = useRouter();
  const { page, orderBy, keyword } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page as string, 10) || 1);
  const [currentOrderBy, setCurrentOrderBy] = useState<string>((orderBy as string) || "recent");
  const [currentKeyword, setCurrentKeyword] = useState<string>((keyword as string) || "");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: sortedArticles = [] } = useQuery<List[]>({
    queryKey: ["sortedArticles"],
    queryFn: getSortedArticles,
  });

  useEffect(() => {
    setCurrentPage(parseInt(page as string, 10) || 1);
    setCurrentOrderBy((orderBy as string) || "recent");
    setCurrentKeyword((keyword as string) || "");
  }, [page, orderBy, keyword]);

  useEffect(() => {
    if (currentPage !== totalCount) {
      queryClient.prefetchQuery({
        queryKey: ["articles", currentPage + 1, currentOrderBy, currentKeyword],
        queryFn: () => getArticle(currentPage + 1, currentOrderBy, currentKeyword),
        staleTime: 30000, // 30초
      });
    }
  }, [currentPage, currentOrderBy, currentKeyword, queryClient]);

  const { data } = useQuery<RootObject>({
    queryKey: ["articles", currentPage, currentOrderBy, currentKeyword],
    queryFn: () => getArticle(currentPage, currentOrderBy, currentKeyword),
    placeholderData: keepPreviousData,
  });

  const updateURL = (newPage?: number, newOrderBy?: string, newKeyword?: string) => {
    const query: any = {};
    if (newPage !== undefined) query.page = newPage;
    if (newOrderBy !== undefined) query.orderBy = newOrderBy;
    if (newKeyword !== undefined) query.keyword = newKeyword;

    router.push(
      {
        pathname: "/board",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageChange = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > totalCount ||
      (newPage === 1 && currentPage === 1) ||
      (newPage === totalCount && currentPage === totalCount)
    )
      return;
    setCurrentPage(newPage);
    updateURL(newPage, currentOrderBy, currentKeyword);
  };

  const handleOrderByChange = (newOrderBy: string) => {
    setCurrentOrderBy(newOrderBy);
    updateURL(currentPage, newOrderBy, currentKeyword);
  };

  const handleKeywordEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      setCurrentKeyword(target.value);
      updateURL(1, currentOrderBy, target.value);
    }
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const articles = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="mx-auto my-0 w-full min-w-368 max-w-1200 px-34 py-0">
      <BestArticle Posts={sortedArticles} />
      <Article
        Posts={articles}
        searchValue={searchKeyword}
        searchChange={handleKeywordChange}
        onEnter={handleKeywordEnter}
      />
      <Pagination
        totalPages={totalCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
