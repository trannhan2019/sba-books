import {
  setDepartment,
  setDepartmentId,
} from "@/store/department/departmentSlice";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SvgIcon,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const SearchUser = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { departments, departmentId } = useSelector(
    (state) => state.department
  );
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
          value={departmentId}
          labelId="department_id"
          id="demo-simple-select"
          label="Chọn phòng ban"
          displayEmpty
          onChange={(event) => dispatch(setDepartmentId(event.target.value))}
        >
          <MenuItem>--Tất cả --</MenuItem>
          {departments?.length > 0 &&
            departments.map((item) => (
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
