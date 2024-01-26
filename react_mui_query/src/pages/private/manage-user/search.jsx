import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  SvgIcon,
} from "@mui/material";
import { useState } from "react";

const SearchUser = ({
  onSearch,
  handlePageReset,
  departments,
  departmentId,
  setDepartmentId,
}) => {
  const [valueSearch, setValueSearch] = useState("");

  const submitChangeSearch = (event) => {
    event.preventDefault();
    onSearch(valueSearch);
    handlePageReset();
  };

  const handleChangeSelect = (event) => {
    setDepartmentId(event.target.value);
    handlePageReset();
  };

  return (
    <Stack direction="row" gap={5}>
      <FormControl sx={{ width: 400 }}>
        <InputLabel id="department_id">Chọn phòng ban</InputLabel>
        <Select
          size="small"
          value={departmentId}
          labelId="department_id"
          id="demo-simple-select"
          label="Chọn phòng ban"
          displayEmpty
          onChange={(event) => handleChangeSelect(event)}
        >
          <MenuItem value={0}>--Tất cả --</MenuItem>
          {departments?.length > 0 &&
            departments.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <form onSubmit={(event) => submitChangeSearch(event)}>
        <Stack direction="row" spacing={2}>
          <OutlinedInput
            onChange={(e) => setValueSearch(e.target.value)}
            defaultValue=""
            fullWidth
            size="small"
            placeholder="Tìm kiếm theo tên người dùng ..."
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 450 }}
          />
          <Button variant="outlined" size="small" type="submit">
            Search
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default SearchUser;
