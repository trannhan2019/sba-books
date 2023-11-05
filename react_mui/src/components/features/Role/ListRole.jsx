import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import {
  Box,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { apiDeleteRole } from "@/apis/role";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ListRole = ({
  onLoading,
  items,
  setRole,
  setOpenEditForm,
  setReloadPage,
}) => {
  //handel Del single
  const handleDelete = (id) => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteRole(id);
          setReloadPage((preState) => !preState);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("delete department", error);
          // Swal.showValidationMessage("Lỗi không xóa được thông tin");
          toast.error("Lỗi không xóa được thông tin");
        }
      }
    });
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên quyền</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {onLoading ? (
              <TableLoader rowsNum={5} colsNum={3} />
            ) : (
              <TableBody>
                {items?.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  items?.map((role) => {
                    return (
                      <TableRow hover key={role.id}>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {role.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" gap={1}>
                            <IconButton
                              onClick={() => {
                                setOpenEditForm(true);
                                setRole(role);
                              }}
                            >
                              <EditNoteOutlinedIcon color="indigo" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(role.id)}>
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
    </Card>
  );
};

export default ListRole;
