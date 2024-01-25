import { setDepartmentId } from "@/store/department/departmentSlice";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
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
import { useDispatch, useSelector } from "react-redux";

const SearchUser = ({
  onSearch,
  handlePageReset,
  departments,
  departmentId,
  setDepartmentId,
}) => {
  // const dispatch = useDispatch();
  // const {  departmentId } = useSelector(
  //   (state) => state.department
  // );

  const handleChangeSelect = (event) => {
    setDepartmentId(event.target.value);
    handlePageReset();
  };

  const handleChangeSearch = (event) => {
    onSearch(event.target.value);
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

      <OutlinedInput
        onChange={(event) => handleChangeSearch(event)}
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
    </Stack>
  );
};

export default SearchUser;
