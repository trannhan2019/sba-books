import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

const SearchCategory = ({ onSearch, handlePageReset }) => {
  const handleChangeSearch = (event) => {
    onSearch(event.target.value);
    handlePageReset();
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <OutlinedInput
        onChange={(event) => handleChangeSearch(event)}
        defaultValue=""
        fullWidth
        size="small"
        placeholder="Tìm kiếm theo tên danh mục ..."
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

export default SearchCategory;
