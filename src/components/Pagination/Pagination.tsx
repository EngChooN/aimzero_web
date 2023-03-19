import styled from "@emotion/styled";

interface PageType {
  listLength: number;
  limit: number;
  page: number;
  setPage: Function;
}

const PageButton = styled.div<{ active: boolean }>`
  cursor: pointer;
  margin: 10px;

  font-size: 17px;
  font-family: serif;
  color: ${(props) => (props.active ? "black" : "darkgray")};
`;

export default function PaginationBtn(props: PageType) {
  const pageLength = Math.ceil(props.listLength / props.limit); // all page length

  const onClickPageBtn = (pageNum: number) => {
    props.setPage(pageNum);
    console.log("click page button", props.page);
  };

  const renderPageNumbers = () => {
    const pageNumber = [];
    const maxPageButtons = 5; // show page button count (5)

    let startPage = Math.max(1, props.page - Math.floor(maxPageButtons / 2)); // show start page button
    let endPage = Math.min(startPage + maxPageButtons - 1, pageLength); // show end page button
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumber.push(
        <PageButton
          key={i}
          onClick={() => onClickPageBtn(i)}
          active={props.page == i}
        >
          {i}
        </PageButton>
      );
    }
    return pageNumber;
  };

  const prevPage = () => {
    props.setPage(props.page - 1);
  };

  const quickPrevPage = () => {
    if (props.page <= 5) {
      props.setPage(1);
    } else {
      props.setPage(props.page - 5);
    }
  };

  const nextPage = () => {
    props.setPage(props.page + 1);
  };

  const quickNextPage = () => {
    if (props.page >= pageLength - 5) {
      props.setPage(pageLength);
    } else {
      props.setPage(props.page + 5);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {props.page < 4 ? (
        <div style={{ width: "17px", margin: "10px", color: "lightGray" }}>
          {"<<"}
        </div>
      ) : (
        <PageButton onClick={quickPrevPage} active={true}>
          {"<<"}
        </PageButton>
      )}
      {props.page == 1 ? (
        <div style={{ width: "8.5px", margin: "10px", color: "lightGray" }}>
          {"<"}
        </div>
      ) : (
        <PageButton onClick={prevPage} active={true}>
          {"<"}
        </PageButton>
      )}
      {renderPageNumbers()}
      {props.page == pageLength ? (
        <div style={{ width: "8.5px", margin: "10px", color: "lightGray" }}>
          {">"}
        </div>
      ) : (
        <PageButton onClick={nextPage} active={true}>
          {">"}
        </PageButton>
      )}
      {props.page <= pageLength - 3 ? (
        <PageButton onClick={quickNextPage} active={true}>
          {">>"}
        </PageButton>
      ) : (
        <div style={{ width: "17px", margin: "10px", color: "lightGray" }}>
          {">>"}
        </div>
      )}
    </div>
  );
}
