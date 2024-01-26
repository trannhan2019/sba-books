import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { apiStoreUser } from "@/apis/user";

const scheme = Yup.object({
  name: Yup.string().required("Tên người dùng không để trống"),
  username: Yup.string().required("Tên đăng nhậP không để trống"),
  password: Yup.string().min(6).required("Mật khẩu không để trống"),
  location: Yup.number().required("Thứ tự không được để trống"),
  isActive: Yup.boolean().required(),
  department_id: Yup.string().required("Chọn phòng ban"),
  role: Yup.string().required("Chọn quuyền"),
}).required();

const AddUser = ({
  openAddForm,
  setOpenAddForm,
  setReloadPage,
  departments,
  roles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: {
      name: "",
      username: "",
      isActive: true,
      location: 0,
      department_id: "",
      role: "",
      password: "",
    },
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await apiStoreUser(values);
      reset();
      setOpenAddForm(false);
      setReloadPage((preState) => preState + 1);
      toast.success("Tạo mới thành công");
    } catch (error) {
      if (error.status === 422 && error.data.errors.username) {
        setError("username", error.data.message);
        toast.error("Tên đăng nhập đã tồn tại");
      } else {
        console.log("add department", error);
        toast.error("Lỗi không thêm được thông tin");
      }
    }
  };

  return (
    <Box>
      <Dialog
        open={openAddForm}
        onClose={() => false}
        sx={{ top: "-15%" }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle sx={{ mb: 2 }}>Thêm thông tin</DialogTitle>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  required
                  margin="normal"
                  label="Tên người dùng"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Tên đăng nhập"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="department_id"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth required error={!!error} margin="normal">
                  <InputLabel id="department_id">Chọn phòng ban</InputLabel>
                  <Select
                    labelId="department_id"
                    id="demo-simple-select"
                    value={value}
                    label="Chọn phòng ban"
                    onChange={onChange}
                    error={!!error}
                  >
                    {departments?.length > 0 &&
                      departments.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth required error={!!error} margin="normal">
                  <InputLabel id="role_id">Chọn quyền</InputLabel>
                  <Select
                    labelId="role_id"
                    id="demo-simple-select"
                    value={value}
                    label="Chọn quyền"
                    onChange={onChange}
                    error={!!error}
                  >
                    {roles?.length > 0 &&
                      roles.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  sx={{ justifyContent: "start", ml: 0, mt: 1 }}
                  control={
                    <Switch
                      defaultValue={true}
                      defaultChecked
                      onChange={onChange}
                    />
                  }
                  label="Trạng thái"
                  labelPlacement="start"
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="normal"
                  required
                  label="Vị trí"
                  type="number"
                  fullWidth
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ mx: 2, mb: 2 }}>
            <Button
              onClick={() => {
                reset();
                setOpenAddForm(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AddUser;
