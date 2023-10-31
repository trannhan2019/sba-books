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
import { Scrollbar } from "@/components/Scrollbar";
import TableLoader from "@/components/TableLoader";
import Swal from "sweetalert2";
import { apiDeleteDepartment, apiDeleteDepartments } from "@/apis/department";
import { useSelection } from "@/hooks/useSelection";

const ListUser = (props) => {
  const {
    onLoading,
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setOpenEditForm,
    setUser,
    setReloadPage,
  } = props;

  //seleted
  const userSelected = useSelection(items);
  const selectedSome =
    userSelected.selected.length > 0 &&
    userSelected.selected.length < items.length;
  const selectedAll =
    items.length > 0 && userSelected.selected.length === items.length;

  //show edit
  const showEdit = async (user) => {
    setUser(user);
    setOpenEditForm(true);
  };
  //handel Del single
  //   const handleDeleteDepartment = (id) => {
  //     Swal.fire({
  //       icon: "info",
  //       title: "Bạn có muốn xóa dữ liệu ?",
  //       showCancelButton: true,
  //       confirmButtonText: "Xác nhận",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           await apiDeleteDepartment(id);
  //           setReloadPage((preState) => !preState);
  //           Swal.fire("Saved!", "", "success");
  //         } catch (error) {
  //           console.log("delete department", error);
  //           // Swal.showValidationMessage("Lỗi không xóa được thông tin");
  //           toast.error("Lỗi không xóa được thông tin");
  //         }
  //       }
  //     });
  //   };
  //   const handleDeleteAllDepartment = () => {
  //     Swal.fire({
  //       icon: "info",
  //       title: "Bạn có muốn xóa dữ liệu ?",
  //       showCancelButton: true,
  //       confirmButtonText: "Xác nhận",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           await apiDeleteDepartments({ ids: departmentSelected.selected });
  //           setReloadPage((preState) => !preState);
  //           Swal.fire("Saved!", "", "success");
  //         } catch (error) {
  //           console.log("delete department", error);
  //           // Swal.showValidationMessage("Lỗi không xóa được thông tin");
  //           toast.error("Lỗi không xóa được thông tin");
  //         }
  //       }
  //     });
  //   };

  return (
    <Card>
      {userSelected.selected.length > 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "end", pr: 7, paddingY: 1 }}
        >
          <Button
            // onClick={() => handleDeleteAllDepartment()}
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
                        userSelected.handleSelectAll?.();
                      } else {
                        userSelected.handleDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Tên đăng nhập</TableCell>
                <TableCell>Quyền hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {onLoading ? (
              <TableLoader rowsNum={8} colsNum={5} />
            ) : (
              <TableBody>
                {items.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((user) => {
                    const isSelected = userSelected.selected.includes(user.id);

                    return (
                      <TableRow hover key={user.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                userSelected.handleSelectOne?.(user);
                              } else {
                                userSelected.handleDeselectOne?.(user);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.roles[0].name}</TableCell>
                        <TableCell>
                          {user.isActive ? (
                            <Chip
                              label="Hoạt động"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip label="Tạm dừng" color="error" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" gap={1}>
                            <IconButton onClick={() => showEdit(user)}>
                              <EditNoteOutlinedIcon color="indigo" />
                            </IconButton>
                            <IconButton
                            //   onClick={() =>
                            //     handleDeleteDepartment(department.id)
                            //   }
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
        count={count}
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

export default ListUser;
