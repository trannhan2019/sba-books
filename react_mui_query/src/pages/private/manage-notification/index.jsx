import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Stack, Typography } from "@mui/material";
import { setLoading } from "@/store/app/appSlice";
import { apiGetBookNotificationPaginate } from "@/apis/notify";
import ListBookNotification from "./list";

const ManageBookNotification = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  //cac state
  const [notifyList, setNotifyList] = useState({ notifies: [], total: 0 });

  //paginate
  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  //featch data
  const fetchData = async (page, itemPerPage) => {
    if (user.username === "sba_manager") {
      try {
        dispatch(setLoading(true));
        const response = await apiGetBookNotificationPaginate({
          page,
          itemPerPage,
        });
        console.log(response);
        setNotifyList({
          notifies: response.data.data,
          total: response.data.total,
        });
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log("get all", error);
      }
    }
  };

  useEffect(() => {
    fetchData(page, itemPerPage);
  }, [page, itemPerPage]);

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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Quản lý thông báo</Typography>
            </Stack>
            <ListBookNotification
              notifies={notifyList.notifies}
              fetchData={fetchData}
              total={notifyList.total}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ManageBookNotification;
