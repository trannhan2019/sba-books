import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Stack, Typography } from "@mui/material";
import { setLoading } from "@/store/app/appSlice";
import { apiGetBookNotificationPaginate } from "@/apis/notify";
import ListBookNotification from "./list";
import { usePaginateMui } from "@/hooks/usePaginateMui";
// import { useQuery } from "@tanstack/react-query";

const ManageBookNotification = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  //cac state
  const [notifyList, setNotifyList] = useState({ notifies: [], total: 0 });

  //paginate
  const {
    page,
    pageMui,
    handlePageChange,
    itemPerPage,
    handleRowsPerPageChange,
  } = usePaginateMui();

  // const {data:notifiesData} = useQuery({
  //     queryKey:['notify-list',page,itemPerPage],
  //     queryFn:()=>{
  //         return apiGetBookNotificationPaginate({page,itemPerPage})
  //     }
  // })

  //featch data
  const fetchData = async (page, itemPerPage) => {
    if (user.username === "sba_manager") {
      try {
        dispatch(setLoading(true));
        const response = await apiGetBookNotificationPaginate({
          page,
          itemPerPage,
        });
        // console.log(response);
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
              notifies={notifyList.notifies || []}
              fetchData={fetchData}
              total={notifyList.total || 0}
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
