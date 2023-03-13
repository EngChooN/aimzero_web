import { useEffect } from "react";

export interface PageType {
  listLength: number;
  limit: number;
  page: number;
  setPage: Function;
  blockNum: number;
  setBlockNum: Function;
}

export default function PaginationBtn(props: PageType) {
  const pageLength = Math.ceil(props.listLength / props.limit); // all page length

  const onClickPageBtn = (pageNum) => {
    props.setPage(pageNum);
    console.log("click page button", props.page);
  };

  const renderPageNumbers = () => {
    const pageNumber = [];
    for (let i = 1; i <= pageLength; i++) {
      pageNumber.push(
        <button key={i} onClick={() => onClickPageBtn(i)}>
          {i}
        </button>
      );
    }
    return pageNumber;
  };

  return <div>{renderPageNumbers()}</div>;
}
