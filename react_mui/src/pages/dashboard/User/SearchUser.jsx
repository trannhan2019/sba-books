import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SvgIcon,
} from "@mui/material";

const SearchUser = ({
  onSearch,
  departmentList,
  selectDepartment,
  setSelectDepartment,
}) => {
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
      <FormControl fullWidth>
        <InputLabel id="department_id">Chọn phòng ban</InputLabel>
        <Select
          size="small"
          labelId="department_id"
          id="demo-simple-select"
          value={selectDepartment}
          label="Chọn phòng ban"
          onChange={(event) => setSelectDepartment(event.target.value)}
        >
          <MenuItem value="" selected>
            --Tất cả --
          </MenuItem>
          {departmentList?.length > 0 &&
            departmentList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <OutlinedInput
        onChange={(e) => onSearch(e.target.value)}
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
    </Card>
  );
};

export default SearchUser;
