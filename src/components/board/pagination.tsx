import classNames from "classnames";
import { IconArrowLeft, IconArrowLeftGray, IconArrowRight, IconArrowRightGray } from "@utils/icon";

const ELLIPSIS = "···";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pageNumbers = [];

  const commonPageClassName =
    "flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal hover:bg-[#1e293b]";
  const ellipsisClassName =
    "flex h-40 w-40 cursor-default select-none items-center justify-center text-20 font-normal text-[#818181]";
  const commonIconClassName =
    "flex h-40 w-40 cursor-pointer select-none items-center justify-center text-20 font-normal";

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => onPageChange(i)}
          className={classNames(commonPageClassName, {
            "text-[#10B981]": currentPage === i,
            "text-[#818181]": currentPage !== i,
          })}
        >
          {i}
        </div>
      );
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={classNames(commonPageClassName, {
              "text-[#10B981]": currentPage === i,
              "text-[#818181]": currentPage !== i,
            })}
          >
            {i}
          </div>
        );
      }
      pageNumbers.push(
        <div key="ellipsis1" className={ellipsisClassName}>
          {ELLIPSIS}
        </div>
      );
      pageNumbers.push(
        <div
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={classNames(commonPageClassName, {
            "text-[#10B981]": currentPage === totalPages,
            "text-[#818181]": currentPage !== totalPages,
          })}
        >
          {totalPages}
        </div>
      );
    } else if (currentPage >= totalPages - 3) {
      pageNumbers.push(
        <div
          key={1}
          onClick={() => onPageChange(1)}
          className={classNames(commonPageClassName, {
            "text-[#10B981]": currentPage === 1,
            "text-[#818181]": currentPage !== 1,
          })}
        >
          {1}
        </div>
      );
      pageNumbers.push(
        <div key="ellipsis1" className={ellipsisClassName}>
          {ELLIPSIS}
        </div>
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={classNames(commonPageClassName, {
              "text-[#10B981]": currentPage === i,
              "text-[#818181]": currentPage !== i,
            })}
          >
            {i}
          </div>
        );
      }
    } else {
      pageNumbers.push(
        <div
          key={1}
          onClick={() => onPageChange(1)}
          className={classNames(commonPageClassName, {
            "text-[#10B981]": currentPage === 1,
            "text-[#818181]": currentPage !== 1,
          })}
        >
          {1}
        </div>
      );
      pageNumbers.push(
        <div key="ellipsis1" className={ellipsisClassName}>
          {ELLIPSIS}
        </div>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <div
            key={i}
            onClick={() => onPageChange(i)}
            className={classNames(commonPageClassName, {
              "text-[#10B981]": currentPage === i,
              "text-[#818181]": currentPage !== i,
            })}
          >
            {i}
          </div>
        );
      }
      pageNumbers.push(
        <div key="ellipsis2" className={ellipsisClassName}>
          {ELLIPSIS}
        </div>
      );
      pageNumbers.push(
        <div
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={classNames(commonPageClassName, {
            "text-[#10B981]": currentPage === totalPages,
            "text-[#818181]": currentPage !== totalPages,
          })}
        >
          {totalPages}
        </div>
      );
    }
  }

  return (
    <div className="mb-4 mt-4 flex items-center justify-center gap-1.5">
      {currentPage === 1 ? (
        <IconArrowLeftGray
          className={classNames(commonIconClassName, {
            "cursor-not-allowed": currentPage === 1,
          })}
          alt="arrow_left"
        />
      ) : (
        <IconArrowLeft
          className={classNames(commonIconClassName, {
            "cursor-not-allowed": currentPage === 1,
          })}
          onClick={() => onPageChange(currentPage - 1)}
          alt="arrow_left"
        />
      )}
      {pageNumbers}
      {currentPage === totalPages ? (
        <IconArrowRightGray
          className={classNames(commonIconClassName, {
            "cursor-not-allowed": currentPage === totalPages,
          })}
          alt="arrow_right"
        />
      ) : (
        <IconArrowRight
          className={classNames(commonIconClassName, {
            "cursor-not-allowed": currentPage === totalPages,
          })}
          onClick={() => onPageChange(currentPage + 1)}
          alt="arrow_right"
        />
      )}
    </div>
  );
}
