import {
  Box,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import Select from "react-select";

const SearchBook = ({
  cateBooks,
  setCateSelected,
  onSearch,
  handlePageReset,
}) => {
  let options = cateBooks.map(function (item) {
    return { value: item.id, label: item.name };
  });
  const handleChangeSelect = (values) => {
    setCateSelected(values.map((item) => item.value));
    handlePageReset();
  };

  const handleChangeSearch = (event) => {
    onSearch(event.target.value);
    handlePageReset();
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Select
          options={options}
          isMulti
          onChange={handleChangeSelect}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "300px",
            }),
          }}
          placeholder="Chọn thể loại ..."
        />

        <OutlinedInput
          onChange={(e) => handleChangeSearch(e)}
          defaultValue=""
          size="small"
          sx={{ width: "300px" }}
          placeholder="Tìm kiếm theo tiều đề sách, tác giả ..."
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
        />
      </Stack>
    </Box>
  );
};

export default SearchBook;
