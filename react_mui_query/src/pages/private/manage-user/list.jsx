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
import { apiDeleteUser, apiDeleteUsers } from "@/apis/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserCurrent } from "@/store/user/userSlice";

const ListUser = (props) => {
  const {
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    setOpenEditForm,
    setReloadPage,
  } = props;

  const { isLoading } = useSelector((state) => state.app);
  const { total, userList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //seleted
  const userSelected = useSelection(userList);
  const selectedSome =
    userSelected.selected.length > 0 &&
    userSelected.selected.length < userList.length;
  const selectedAll =
    userList.length > 0 && userSelected.selected.length === userList.length;

  //show edit
  const showEdit = async (user) => {
    dispatch(setUserCurrent(user));
    setOpenEditForm(true);
  };
  // handel Del single
  const handleDeleteUser = (id) => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteUser(id);
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete department", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };
  const handleDeleteAllUser = () => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteUsers({ ids: userSelected.selected });
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete user", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };

  return (
    <Card>
      {userSelected.selected.length > 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "end", pr: 7, paddingY: 1 }}
        >
          <Button
            onClick={() => handleDeleteAllUser()}
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
                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Tên người dùng
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Tên đăng nhập
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Quyền hạn
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Phòng ban
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Trạng thái
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
                {userList.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  userList.map((user) => {
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
                        <TableCell>{user.role.name}</TableCell>
                        <TableCell>{user.department.name}</TableCell>
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
                              onClick={() => handleDeleteUser(user.id)}
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
    </Card>
  );
};

export default ListUser;
