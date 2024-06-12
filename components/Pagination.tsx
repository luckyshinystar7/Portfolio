import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/utils/cn";

const NAVIGATION_DIRECTION = {
  FORWARDS: "FORWARDS",
  BACKWARDS: "BACKWARDS",
};

type Props = {
  totalCount: number;
  hideText?: boolean;
  className?: string;
  pagination: any;
  setPagination: (state: any) => void;
};

export const Pagination = ({
  totalCount,
  hideText = false,
  className = "",
  pagination,
  setPagination,
}: Props) => {
  const [navigationDirection, setNavigationDirection] = React.useState(
    NAVIGATION_DIRECTION.FORWARDS
  );
  const pageIndex = pagination?.skip / pagination?.take;
  const pageCount = Math.ceil(totalCount / pagination?.take);
  const startRange = pagination?.skip + 1;
  const endRange = Math.min(pagination?.skip + pagination?.take, totalCount);
  const canPreviousPage = pagination?.skip > 0;
  const canNextPage = endRange < totalCount;

  let pagesToShow = [];
  if (pageCount <= 3) {
    pagesToShow = [...Array(pageCount).keys()];
  } else if (navigationDirection === NAVIGATION_DIRECTION.FORWARDS) {
    if (pageIndex <= pageCount - 3) {
      pagesToShow = [pageIndex, pageIndex + 1, pageIndex + 2];
    } else {
      pagesToShow = [pageCount - 3, pageCount - 2, pageCount - 1];
    }
  } else {
    // navigationDirection === 'BACKWARDS'
    if (pageIndex > 1) {
      pagesToShow = [pageIndex - 2, pageIndex - 1, pageIndex];
    } else {
      pagesToShow = [0, 1, 2];
    }
  }

  // if (pageCount === 1) return;

  return (
    <div
      className={cn(
        "mt-6 flex w-full items-center justify-center gap-8 font-inter text-xs leading-loose text-neutral-5",
        className
      )}
    >
      {!hideText && (
        <div>
          Showing {startRange}-{endRange} of {totalCount} records
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="disabled:opacity-10"
          onClick={() => {
            setNavigationDirection(NAVIGATION_DIRECTION.FORWARDS);
            setPagination({
              ...pagination,
              skip: Math.max(0, pagination?.skip - pagination?.take),
            });
          }}
          disabled={!canPreviousPage}
        >
          <CaretLeft size={18} />
        </button>
        {/* Pages */}
        <div>
          {pageIndex > 2 && pageCount > 3 && (
            <>
              <button
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center leading-loose",
                  "hover:rounded  hover:bg-primary-100 dark:hover:bg-secondary-100 hover:text-base-100 dark:hover:text-base-100 hover:font-bold ",
                  pageIndex === 0 &&
                    "rounded bg-neutral-3 font-bold text-primary-100 dark:text-secondary-100"
                )}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    skip: 0,
                  })
                }
              >
                1
              </button>
              <span className="inline-flex h-6 w-6 justify-center">...</span>
            </>
          )}
          {pagesToShow.map((pageNumber) => (
            <button
              key={pageNumber}
              className={cn(
                "inline-flex h-6 w-6 items-center justify-center leading-loose",
                "hover:rounded  hover:bg-primary-100 dark:hover:bg-secondary-100 hover:text-base-100 dark:hover:text-base-100 hover:font-bold ",
                pageIndex === pageNumber &&
                  "rounded bg-neutral-3 font-bold text-primary-100 dark:text-secondary-100"
              )}
              onClick={() => {
                if (pageIndex === 0) {
                  setNavigationDirection(NAVIGATION_DIRECTION.FORWARDS);
                } else if (pageIndex === pageCount - 1) {
                  setNavigationDirection(NAVIGATION_DIRECTION.BACKWARDS);
                }
                setPagination({
                  ...pagination,
                  skip: pageNumber * pagination?.take,
                });
              }}
            >
              {pageNumber + 1}
            </button>
          ))}
          {pageIndex <= pageCount - 4 && pageCount > 3 && (
            <>
              <span className="inline-flex h-6 w-6 justify-center">...</span>
              <button
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center leading-loose",
                  "hover:rounded hover:bg-primary-100 dark:hover:bg-secondary-100 hover:text-base-100 dark:hover:text-base-100 hover:font-bold",
                  pageIndex === pageCount - 1 &&
                    "rounded bg-neutral-3 font-bold text-primary-100 dark:text-secondary-100"
                )}
                onClick={() => {
                  setNavigationDirection(NAVIGATION_DIRECTION.BACKWARDS);
                  setPagination({
                    ...pagination,
                    skip: (pageCount - 1) * pagination?.take,
                  });
                }}
              >
                {pageCount}
              </button>
            </>
          )}
        </div>
        <button
          type="button"
          className="disabled:opacity-10"
          onClick={() =>
            setPagination({
              ...pagination,
              skip: pagination?.skip + pagination?.take,
            })
          }
          disabled={!canNextPage}
        >
          <CaretRight size={18} />
        </button>
      </div>
    </div>
  );
};
