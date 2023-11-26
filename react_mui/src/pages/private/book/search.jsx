import {
  Box,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import Select from "react-select";

const SearchBook = ({ cateBooks, setCateSelected, onSearch }) => {
  let options = cateBooks.map(function (item) {
    return { value: item.id, label: item.name };
  });
  const handleChange = (values) => {
    setCateSelected(values.map((item) => item.value));
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Select
          options={options}
          isMulti
          onChange={handleChange}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "300px",
            }),
          }}
          placeholder="Chọn thể loại ..."
        />

        <OutlinedInput
          onChange={(e) => onSearch(e.target.value)}
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
