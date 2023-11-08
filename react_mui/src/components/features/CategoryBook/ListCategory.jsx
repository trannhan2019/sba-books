import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import Swal from "sweetalert2";
import { useSelection } from "@/hooks/useSelection";
import {
  apiDeleteCategoryBook,
  apiDeleteCategoryBooks,
} from "@/apis/category_book";
import { setCateBook } from "@/store/category_book/catebookSlice";
import { useDispatch, useSelector } from "react-redux";

const ListCategory = (props) => {
  const {
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setOpenEditForm,
    setReloadPage,
  } = props;

  const { isLoading } = useSelector((state) => state.app);
  const { cateBooks, cateBook, totalCate } = useSelector(
    (state) => state.cateBook
  );
  const dispatch = useDispatch();

  //seleted
  const listSelected = useSelection(cateBooks);
  const selectedSome =
    listSelected.selected.length > 0 &&
    listSelected.selected.length < cateBooks.length;
  const selectedAll =
    cateBooks.length > 0 && listSelected.selected.length === cateBooks.length;

  //show edit
  const showEdit = (cate) => {
    dispatch(setCateBook(cate));
    setOpenEditForm(true);
  };
  // handel Del single
  const handleDelete = (id) => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteCategoryBook(id);
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };
  const handleDeleteAll = () => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteCategoryBooks({ ids: listSelected.selected });
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };

  return (
    <Card>
      {listSelected.selected.length > 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "end", pr: 7, paddingY: 1 }}
        >
          <Button
            onClick={() => handleDeleteAll()}
            size="small"
            startIcon={<DeleteOutlinedIcon />}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        listSelected.handleSelectAll?.();
                      } else {
                        listSelected.handleDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Tên người dùng
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Hành động
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableLoader rowsNum={8} colsNum={5} />
            ) : (
              <TableBody>
                {cateBooks.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  cateBooks.map((item) => {
                    const isSelected = listSelected.selected.includes(item.id);

                    return (
                      <TableRow hover key={item.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                listSelected.handleSelectOne?.(item);
                              } else {
                                listSelected.handleDeselectOne?.(item);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" gap={1}>
                            <IconButton onClick={() => showEdit(item)}>
                              <EditNoteOutlinedIcon color="indigo" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(cateBook.id)}
                            >
                              <DeleteOutlinedIcon color="error" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            )}
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={totalCate}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton
        showLastButton
      />
    </Card>
  );
};

export default ListCategory;
