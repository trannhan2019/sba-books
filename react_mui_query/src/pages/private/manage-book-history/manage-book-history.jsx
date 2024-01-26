import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { apiGetBookHistory } from "@/apis/book-history";

import ManageBookHistoryList from "./list";
import ManageBookHistorySearch from "./search";
import { usePaginateMui } from "@/hooks/usePaginateMui";
import { useQuery } from "@tanstack/react-query";

const ManageBookHistory = () => {
  //states
  const [search, setSearch] = useState("");
  const [reloadPage, setReloadPage] = useState(0);

  const {
    page,
    pageMui,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
  } = usePaginateMui();

  //fetch Data
  const { isLoading, data: bookHistoryData } = useQuery({
    queryKey: ["book-history-list", page, itemPerPage, search, reloadPage],
    queryFn: () => {
      return apiGetBookHistory({ page, itemPerPage, search });
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Quản lý lịch sử mượn trả sách</Typography>

            <ManageBookHistorySearch
              onSearch={setSearch}
              handlePageReset={handlePageReset}
            />

            <ManageBookHistoryList
              bookHistoryList={bookHistoryData?.data.data || []}
              total={bookHistoryData?.data.total || 0}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setReloadPage={setReloadPage}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ManageBookHistory;
