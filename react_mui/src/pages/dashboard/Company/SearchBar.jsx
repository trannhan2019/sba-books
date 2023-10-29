import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Swal from "sweetalert2";

export const SearchBar = ({ onSearchName, selected, handleDeleteAll }) => {
  //handle Delete
  const onDelete = () => {
    Swal.fire({
      icon: "info",
      title: "Bạn có muốn xóa dữ liệu ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAll();
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <OutlinedInput
        onChange={(e) => onSearchName(e.target.value)}
        defaultValue=""
        fullWidth
        placeholder="Tìm kiếm theo tên Công ty ..."
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 450 }}
      />
      {selected.length > 0 && (
        <div>
          <Button
            onClick={() => onDelete()}
            startIcon={<DeleteOutlinedIcon />}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};
