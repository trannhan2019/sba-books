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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import Swal from "sweetalert2";
import { useSelection } from "@/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "@/store/company/companySlice";
import { apiDeleteCompanies, apiDeleteCompany } from "@/apis/company";
import { toast } from "react-toastify";

export const CompaniesTable = (props) => {
  const {
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    handleOpenDialogEdit,
    setReloadPage,
  } = props;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.app);
  const { companies, total } = useSelector((state) => state.company);

  //Selected
  const listSelected = useSelection(companies);

  const selectedSome =
    listSelected.selected.length > 0 &&
    listSelected.selected.length < companies.length;
  const selectedAll =
    companies.length > 0 && listSelected.selected.length === companies.length;

  //handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteCompany(id);
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };

  const handleDeleteAll = async () => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteCompanies({ ids: listSelected.selected });
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };

  // show edit
  const showEdit = (company) => {
    dispatch(setCompany(company));
    handleOpenDialogEdit();
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
          <Table>
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
                <TableCell>Tên Công ty</TableCell>
                <TableCell>Tên viết tắt</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableLoader rowsNum={5} colsNum={4} />
            ) : (
              <TableBody>
                {companies.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  companies.map((company) => {
                    const isSelected = listSelected.selected.includes(
                      company.id
                    );

                    return (
                      <TableRow hover key={company.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                listSelected.handleSelectOne?.(company);
                              } else {
                                listSelected.handleDeselectOne?.(company);
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
                            <IconButton
                              onClick={() => handleDelete(company.id)}
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
