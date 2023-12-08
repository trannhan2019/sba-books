import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app/appSlice";
import { apiGetBookHistoryByUser } from "@/apis/book-history";
import BookHistoryList from "./list";

const BookHistory = () => {
  const dispatch = useDispatch();
  //states
  const [bookHistoryData, setBookHistoryData] = useState({
    bookHistoryList: [],
    total: 0,
  });

  //fetch Data
  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiGetBookHistoryByUser();
      setBookHistoryData({
        bookHistoryList: res.data.data,
        total: res.data.total,
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all department", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
            <Typography variant="h4">Lịch sử mượn trả sách</Typography>

            {/* <SearchBook
          onSearch={setSearch}
          cateBooks={cateBooks}
          setCateSelected={setCateSelected}
          handlePageReset={handlePageReset}
        /> */}

            <BookHistoryList
              bookHistoryList={bookHistoryData.bookHistoryList}
              total={bookHistoryData.total}
              // page={pageMui}
              // rowsPerPage={itemPerPage}
              // onRowsPerPageChange={handleRowsPerPageChange}
              // onPageChange={handlePageChange}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default BookHistory;
