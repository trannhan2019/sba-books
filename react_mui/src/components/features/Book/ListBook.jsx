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
import { useDispatch, useSelector } from "react-redux";

const ListBook = (props) => {
  const {
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    handleOpenEditForm,
    setReloadPage,
  } = props;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.app);
  const { total, users } = useSelector((state) => state.book);

  //seleted
  const bookSelected = useSelection(users);
  const selectedSome =
    bookSelected.selected.length > 0 &&
    bookSelected.selected.length < users.length;
  const selectedAll =
    users?.length > 0 && bookSelected.selected.length === users.length;

  return (
    <Card>
      {bookSelected.selected.length > 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "end", pr: 7, paddingY: 1 }}
        >
          {/* <Button
        onClick={() => handleDeleteAllDepartment()}
        size="small"
        startIcon={<DeleteOutlinedIcon />}
        variant="contained"
        color="error"
      >
        Delete
      </Button> */}
        </Box>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                checked={selectedAll}
                indeterminate={selectedSome}
                onChange={(event) => {
                  if (event.target.checked) {
                    bookSelected.handleSelectAll?.();
                  } else {
                    bookSelected.handleDeselectAll?.();
                  }
                }}
              /> */}
                </TableCell>
                <TableCell>Tên Phòng ban</TableCell>
                <TableCell>Tên viết tắt</TableCell>
                <TableCell>Thuộc Công ty</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableLoader rowsNum={8} colsNum={5} />
            ) : (
              <TableBody>
                {users?.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  users?.map((department) => {
                    const isSelected = bookSelected.selected.includes(
                      department.id
                    );

                    return (
                      <TableRow hover key={department.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                bookSelected.handleSelectOne?.(department);
                              } else {
                                bookSelected.handleDeselectOne?.(department);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {department.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{department.alias}</TableCell>
                        <TableCell>{department.company.name}</TableCell>
                        <TableCell>
                          {department.isActive ? (
                            <Chip
                              label="Hoạt động"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="Tạm dừng"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" gap={1}>
                            {/* <IconButton onClick={() => showEdit(department)}>
                          <EditNoteOutlinedIcon color="indigo" />
                        </IconButton> */}
                            {/* <IconButton
                          onClick={() =>
                            handleDeleteDepartment(department.id)
                          }
                        >
                          <DeleteOutlinedIcon color="error" />
                        </IconButton> */}
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

export default ListBook;
