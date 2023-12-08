import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import BookImageDefault from "@/assets/default-image-book.jpg";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import { getUrlImage } from "@/utils/get-url-image";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiUpdateBookHistory } from "@/apis/book-history";

const BookHistoryList = (props) => {
  const {
    bookHistoryList,
    total,
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const { isLoading } = useSelector((state) => state.app);

  const handleUpdate = (id) => {
    Swal.fire({
      icon: "info",
      title: "Xác nhận trả sách ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiUpdateBookHistory(id);
          // setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete user", error);
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
              <TableCell>Tiều đề sách</TableCell>
              <TableCell>Thời gian mượn</TableCell>
              <TableCell>Thời gian trả</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableLoader rowsNum={3} colsNum={4} />
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
                          {item.exchanged_at}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">
                          {item.returned_at}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {item.exchanged_at && item.returned_at ? (
                          <Chip label="Đã trả" color="success" />
                        ) : (
                          <Button
                            size="small"
                            onClick={() => handleUpdate(item.id)}
                            variant="contained"
                          >
                            Đang mượn...
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          )}
        </Table>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        showFirstButton
        showLastButton
      /> */}
    </Box>
  );
};

export default BookHistoryList;
