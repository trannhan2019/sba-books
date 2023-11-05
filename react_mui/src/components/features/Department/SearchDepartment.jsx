import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";

const SearchDepartment = ({ onSearch }) => {
  //handle Delete
  //   const onDelete = () => {
  //     Swal.fire({
  //       icon: "info",
  //       title: "Bạn có muốn xóa dữ liệu ?",
  //       showCancelButton: true,
  //       confirmButtonText: "Xác nhận",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         handleDeleteAll();
  //         Swal.fire("Saved!", "", "success");
  //       }
  //     });
  //   };

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
        onChange={(e) => onSearch(e.target.value)}
        defaultValue=""
        fullWidth
        placeholder="Tìm kiếm theo tên Phòng ban hoặc tên viết tắt ..."
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 450 }}
      />
    </Card>
  );
};

export default SearchDepartment;
