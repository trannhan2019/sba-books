import { useState } from "react";

export const usePaginateMui = () => {
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

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  return {
    pageMui,
    page,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
  };
};
