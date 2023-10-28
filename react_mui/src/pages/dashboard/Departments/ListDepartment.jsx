import { useEffect } from "react";
import {
  Box,
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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Scrollbar } from "@/components/Scrollbar";
import TableLoader from "@/components/TableLoader";
import Swal from "sweetalert2";

const ListDepartment = (props) => {
  const {
    onLoading,
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    // selected = [],
    // onSelected,
    // handleDeleteOne,
    handleOpenEditForm,
    setDepartment,
  } = props;

  //show edit
  const showEdit = async (department) => {
    setDepartment(department);
    handleOpenEditForm();
  };
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                  // checked={selectedAll}
                  // indeterminate={selectedSome}
                  // onChange={(event) => {
                  //   if (event.target.checked) {
                  //     handleSelectAll?.();
                  //   } else {
                  //     handleDeselectAll?.();
                  //   }
                  // }}
                  />
                </TableCell>
                <TableCell>Tên Phòng ban</TableCell>
                <TableCell>Tên viết tắt</TableCell>
                <TableCell>Thuộc Công ty</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {onLoading ? (
              <TableLoader rowsNum={8} />
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
                  items.map((department) => {
                    // const isSelected = selected.includes(company.id);

                    return (
                      <TableRow
                        hover
                        key={department.id}
                        //   selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                          // checked={isSelected}
                          // onChange={(event) => {
                          //   if (event.target.checked) {
                          //     handleSelectOne?.(company);
                          //   } else {
                          //     handleDeselectOne?.(company);
                          //   }
                          // }}
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
                            <IconButton onClick={() => showEdit(department)}>
                              <EditNoteOutlinedIcon color="indigo" />
                            </IconButton>
                            <IconButton
                            // onClick={() => onDelete(company.id)}
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

export default ListDepartment;
