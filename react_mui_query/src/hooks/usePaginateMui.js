import { useState } from "react";

export const usePaginateMui = (limit = 5) => {
  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };
  const handlePageReset = () => {
    setPageMui(0);
    setPage(1);
  };

  const [itemPerPage, setItemPerPage] = useState(limit);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  const handlePageChangeGrid = (event, value) => {
    setPageMui(value - 1);
    setPage(value);
  };

  return {
    pageMui,
    page,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
    handlePageChangeGrid,
  };
};
