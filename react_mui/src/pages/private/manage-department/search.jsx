import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

const SearchDepartment = ({ onSearch, handlePageReset }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
    handlePageReset();
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
        onChange={(e) => handleSearch(e)}
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
