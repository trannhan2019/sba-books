import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app/appSlice";
import { apiGetBookHistory } from "@/apis/book-history";

// import BookHistorySearch from "./search";
import ManageBookHistoryList from "./list";
import ManageBookHistorySearch from "./search";

const ManageBookHistory = () => {
  const dispatch = useDispatch();
  //states
  const [search, setSearch] = useState("");
  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [reloadPage, setReloadPage] = useState(false);
  const [bookHistoryData, setBookHistoryData] = useState({
    bookHistoryList: [],
    total: 0,
  });

  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };

  const handlePageReset = () => {
    setPageMui(0);
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  //fetch Data
  const fetchData = async (page, itemPerPage, search) => {
    try {
      dispatch(setLoading(true));
      const res = await apiGetBookHistory({ page, itemPerPage, search });
      setBookHistoryData({
        bookHistoryList: res.data.data,
        total: res.data.total,
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(page, itemPerPage, search);
  }, [page, itemPerPage, search, reloadPage]);

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
              bookHistoryList={bookHistoryData.bookHistoryList}
              total={bookHistoryData.total}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ManageBookHistory;
