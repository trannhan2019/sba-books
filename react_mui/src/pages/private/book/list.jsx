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
} from "@mui/material";
import BookImageDefault from "@/assets/default-image-book.jpg";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import { getUrlImage } from "@/utils/get-url-image";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListBook = (props) => {
  const {
    books,
    total,
    onPageChange,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;
  const { isLoading } = useSelector((state) => state.app);

  return (
    <Box sx={{ position: "relative" }}>
      <Scrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiều đề</TableCell>
              <TableCell>Thuộc thể loại</TableCell>
              <TableCell>Tác giả</TableCell>
              <TableCell>Tình trạng / Số lượng</TableCell>
              <TableCell>Mã sách</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableLoader rowsNum={8} colsNum={5} />
          ) : (
            <TableBody>
              {books?.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body1">
                      Không tìm thấy dữ liệu ...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                books?.map((book) => {
                  // const isSelected = bookSelected.selected.includes(book.id);

                  return (
                    <TableRow hover key={book.id}>
                      <TableCell width="23%">
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "neutral.50",
                              backgroundImage: `url(${
                                book?.photo_url &&
                                book?.photo_url !== "0" &&
                                book?.photo_url !== "null"
                                  ? book.photo_url
                                  : getUrlImage(book?.photo)
                              })`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: 1,
                              display: "flex",
                              height: 80,
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 80,
                            }}
                          />
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "20rem",
                            }}
                          >
                            <Typography
                              component={Link}
                              to={`/book/${book.id}`}
                              variant="subtitle2"
                              sx={{
                                textDecoration: "none",
                              }}
                            >
                              {book.title}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>

                      <TableCell width="15%">
                        <Typography variant="body2">
                          {book.cate_book.name}
                        </Typography>
                      </TableCell>

                      <TableCell width="15%">
                        <Typography variant="body2">{book.author}</Typography>
                      </TableCell>

                      <TableCell width="10%">
                        {book.quantity > 0 ? (
                          <Stack>
                            <Chip
                              label="Còn trên kệ"
                              color="success"
                              size="small"
                            />
                            <Typography variant="body2" textAlign="center">
                              {book.quantity} cuốn
                            </Typography>
                          </Stack>
                        ) : (
                          <Chip
                            label="Đã mượn hết"
                            color="error"
                            size="small"
                          />
                        )}
                      </TableCell>

                      <TableCell width="10%">
                        <Typography variant="subtitle2">{book.code}</Typography>
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
        rowsPerPageOptions={[8, 16, 24]}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default ListBook;
