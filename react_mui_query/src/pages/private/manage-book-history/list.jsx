import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiDeleteBookHistory } from "@/apis/book-history";
import { format } from "date-fns";

const ManageBookHistoryList = (props) => {
  const {
    bookHistoryList,
    total,
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setReloadPage,
    isLoading,
  } = props;

  // const { isLoading } = useSelector((state) => state.app);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận xoá sách ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteBookHistory(id);
          setReloadPage((preState) => preState + 1);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi cập nhật được thông tin");
        }
      }
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Người mượn</TableCell>
              <TableCell>Tiều đề sách</TableCell>
              <TableCell>Thời gian mượn</TableCell>
              <TableCell>Thời gian trả</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableLoader rowsNum={5} colsNum={4} />
          ) : (
            <TableBody>
              {bookHistoryList?.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body1">
                      Không tìm thấy dữ liệu ...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                bookHistoryList?.map((item) => {
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {item.user.name}
                        </Typography>
                      </TableCell>

                      <TableCell width={"20%"}>
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "20rem",
                          }}
                        >
                          <Typography variant="subtitle2">
                            {item.book.title}
                          </Typography>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">
                          {item.exchanged_at
                            ? format(
                                new Date(item.exchanged_at),
                                "dd/MM/yyyy - HH:mm"
                              )
                            : ""}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">
                          {item.returned_at
                            ? format(
                                new Date(item.returned_at),
                                "dd/MM/yyyy - HH:mm"
                              )
                            : ""}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {item.exchanged_at && item.returned_at ? (
                          <Chip label="Đã trả" color="success" size="small" />
                        ) : (
                          <Chip
                            label="Đang mượn ..."
                            color="warning"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Xoá lịch sử">
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <DeleteOutlineOutlinedIcon color="error" />
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
        rowsPerPageOptions={[5, 10]}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default ManageBookHistoryList;
