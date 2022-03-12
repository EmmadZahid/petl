import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useEffect, useState } from "react";

const PaginationControl = props => {
  const { totalItems, pageSize, currentPage } = props;
  const numberOfPages = Math.ceil(totalItems / pageSize);
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);

  const selectPage = page => {
    if (page > 0 && page <= numberOfPages && !props.controlDisabled) props.onSelect(page);
  };

  const getPageinationItems = () => {
    return pages.map(page => {
      return (
        <PaginationItem active={page === currentPage} key={page}>
          <PaginationLink onClick={() => selectPage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };
  return (
    <nav aria-label="...">
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            href="#pablo"
            onClick={() => selectPage(currentPage - 1)}
            tabIndex="-1"
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {getPageinationItems()}
        <PaginationItem disabled={currentPage === numberOfPages}>
          <PaginationLink
            href="#pablo"
            onClick={() => selectPage(currentPage + 1)}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export default PaginationControl;
