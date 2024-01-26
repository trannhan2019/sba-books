import {
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

const ListCategory = (props) => {
  const {
    onPageChange = () => {},
    onRowsPerPageChange,
    page,
    rowsPerPage = 0,
    setOpenEditForm,
    setReloadPage,
    cateBooks,
    total,
    isLoading,
    setCateBook,
  } = props;

  //seleted
  const listSelected = useSelection(cateBooks);
  const selectedSome =
    listSelected.selected.length > 0 &&
    listSelected.selected.length < cateBooks.length;
  const selectedAll =
    cateBooks.length > 0 && listSelected.selected.length === cateBooks.length;
  const enableBulkActions = listSelected.selected.length > 0;

  //show edit
  const showEdit = (cate) => {
    setCateBook(cate);
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
          setReloadPage((preState) => preState + 1);
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
          setReloadPage((preState) => preState + 1);
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
                listSelected.handleSelectAll?.();
              } else {
                listSelected.handleDeselectAll?.();
              }
            }}
          />
          <Button
            onClick={() => handleDeleteAll()}
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

export default ListCategory;
