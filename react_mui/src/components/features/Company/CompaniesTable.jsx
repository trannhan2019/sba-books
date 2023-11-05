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
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useSelection } from "@/hooks/useSelection";

export const CompaniesTable = (props) => {
  const {
    onLoading,
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onSelected,
    handleDeleteOne,
    handleOpenDialogEdit,
    setCompany,
  } = props;

  //Selected
  const getItemIds = (arrayItems) => arrayItems.map((item) => item.id);

  const handleSelectAll = () => {
    onSelected([...getItemIds(items)]);
  };

  const handleSelectOne = (item) => {
    onSelected((prevState) => [...prevState, item.id]);
  };

  const handleDeselectAll = () => {
    onSelected([]);
  };

  const handleDeselectOne = (item) => {
    onSelected((prevState) => {
      return prevState.filter((_item) => _item !== item.id);
    });
  };

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  useEffect(() => {
    onSelected([]);
  }, [items]);

  //delete Fire Swal
  const onDelete = (id) => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteOne(id);
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  //show edit
  const showEdit = async (company) => {
    setCompany(company);
    handleOpenDialogEdit();
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
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        handleSelectAll?.();
                      } else {
                        handleDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Tên Công ty</TableCell>
                <TableCell>Tên viết tắt</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {onLoading ? (
              <TableLoader rowsNum={5} colsNum={4} />
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
                  items.map((company) => {
                    const isSelected = selected.includes(company.id);
                    // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                    return (
                      <TableRow hover key={company.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                handleSelectOne?.(company);
                              } else {
                                handleDeselectOne?.(company);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {company.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{company.alias}</TableCell>
                        <TableCell>
                          {company.isActive ? (
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
                            <IconButton onClick={() => showEdit(company)}>
                              <EditNoteOutlinedIcon color="indigo" />
                            </IconButton>
                            <IconButton onClick={() => onDelete(company.id)}>
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
