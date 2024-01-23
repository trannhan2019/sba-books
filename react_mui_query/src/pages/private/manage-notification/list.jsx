import {
  Badge,
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import Swal from "sweetalert2";
import { useSelection } from "@/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  apiDeleteAllBookNotification,
  apiDeleteBookNotification,
  apiGetBookNotification,
  apiUpdateBookNotification,
} from "@/apis/notify";
import {
  setNotifications,
  setNotiUnreadCount,
} from "@/store/notify/notifySlice";

const ListBookNotification = (props) => {
  const {
    notifies,
    total,
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 5,
    fetchData,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.app);

  //seleted
  const notifySelected = useSelection(notifies);
  const selectedSome =
    notifySelected.selected.length > 0 &&
    notifySelected.selected.length < notifies.length;
  const selectedAll =
    notifies?.length > 0 && notifySelected.selected.length === notifies.length;
  const enableBulkActions = notifySelected.selected.length > 0;

  //view notification
  const fetchNotifyStore = async () => {
    const response = await apiGetBookNotification();
    if (user.username === "sba_manager") {
      dispatch(setNotifications(response.data.notificationList));
      dispatch(setNotiUnreadCount(response.data.notificationUnreadCount));
    }
  };

  const handleViewNotify = async (id) => {
    await apiUpdateBookNotification(id);
    await fetchNotifyStore();
    navigate("/manage-book-history");
  };

  // handel Del single
  const handleDeleteBookNotification = (id) => {
    // console.log(id);
    Swal.fire({
      icon: "info",
      title: "Có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteBookNotification(id);
          await fetchData();
          await fetchNotifyStore();
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };
  const handleDeleteAllBookNotification = () => {
    Swal.fire({
      icon: "info",
      title: "Có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteAllBookNotification({ ids: notifySelected.selected });
          await fetchData();
          await fetchNotifyStore();
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      {enableBulkActions > 0 && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                notifySelected.handleSelectAll?.();
              } else {
                notifySelected.handleDeselectAll?.();
              }
            }}
          />
          <Button
            onClick={() => handleDeleteAllBookNotification()}
            size="small"
            startIcon={<DeleteOutlinedIcon />}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      notifySelected.handleSelectAll?.();
                    } else {
                      notifySelected.handleDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Nội dung thông báo</TableCell>
              {/* <TableCell>Trạng thái</TableCell> */}
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableLoader rowsNum={5} colsNum={3} />
          ) : (
            <TableBody>
              {notifies?.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body1">
                      Không tìm thấy dữ liệu ...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                notifies?.map((notify) => {
                  const isSelected = notifySelected.selected.includes(
                    notify.id
                  );

                  return (
                    <TableRow
                      hover
                      key={notify.id}
                      selected={isSelected}
                      // invisible={!!true}
                    >
                      <TableCell padding="checkbox">
                        <Badge
                          badgeContent="new"
                          color="primary"
                          invisible={!!notify?.read_at}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                notifySelected.handleSelectOne?.(notify);
                              } else {
                                notifySelected.handleDeselectOne?.(notify);
                              }
                            }}
                          />
                        </Badge>
                      </TableCell>
                      <TableCell onClick={() => handleViewNotify(notify.id)}>
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                          <b>{notify?.data.sender.name}</b>
                          {notify?.data.history.returned_at
                            ? " đã trả sách "
                            : " đã mượn sách "}
                          <b>{notify?.data.book.title}</b>
                          {" lúc "}
                          <b>
                            {notify?.data.history.returned_at
                              ? format(
                                  new Date(notify?.data.history.returned_at),
                                  "dd/MM/yyyy - HH:mm"
                                )
                              : format(
                                  new Date(notify?.data.history.exchanged_at),
                                  "dd/MM/yyyy - HH:mm"
                                )}
                          </b>
                        </Typography>
                      </TableCell>

                      {/* <TableCell width="10%">
                        {notify?.data.read_at ? (
                          <Chip
                            label="Đã xem thông báo"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            label="Chưa xem thông báo"
                            color="error"
                            size="small"
                          />
                        )}
                      </TableCell> */}

                      <TableCell>
                        <Tooltip title="Xoá thông báo">
                          <IconButton
                            onClick={() =>
                              handleDeleteBookNotification(notify?.id)
                            }
                          >
                            <DeleteForeverOutlinedIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          )}
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default ListBookNotification;
