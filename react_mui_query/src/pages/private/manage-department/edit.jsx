import React, { useEffect } from "react";
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
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { apiUpdateDepartment } from "@/apis/department";
// import { useSelector } from "react-redux";

const scheme = Yup.object({
  name: Yup.string().required("Tên Phòng ban không để trống"),
  alias: Yup.string().required("Tên viết tắt không để trống"),
  location: Yup.number().required("Thứ tự không được để trống"),
  company_id: Yup.string().required("Chọn Công ty"),
}).required();

const EditDepartment = ({
  openEditForm,
  handleCloseEditForm,
  companies,
  setReloadPage,
  department,
}) => {
  // const { department } = useSelector((state) => state.department);
  // const { companies } = useSelector((state) => state.company);
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await apiUpdateDepartment(values, department.id);
      reset();
      handleCloseEditForm();
      setReloadPage((preState) => preState + 1);
      toast.success("Sửa thông tin thành công");
    } catch (error) {
      console.log("edit department", error);
      toast.error("Lỗi không sửa được thông tin");
    }
  };

  useEffect(() => {
    setValue("company_id", department?.company.id);
    setValue("name", department?.name);
    setValue("alias", department?.alias);
    setValue("location", department?.location);
    setValue("isActive", department?.isActive);
  }, [openEditForm]);

  return (
    <Box>
      <Dialog
        open={openEditForm}
        onClose={() => false}
        sx={{ top: "-30%" }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle sx={{ mb: 2 }}>Chỉnh sửa thông tin</DialogTitle>
          <DialogContent>
            <Controller
              name="company_id"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth required error={!!error}>
                  <InputLabel id="demo-simple-select-label">
                    Chọn Công ty
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Chọn Công ty"
                    onChange={onChange}
                    error={!!error}
                  >
                    {companies.length > 0 &&
                      companies.map((item) => (
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
              name="name"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Tên Phòng ban"
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
              name="alias"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="normal"
                  required
                  label="Tên viết tắt"
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
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  sx={{ justifyContent: "start", ml: 0, mt: 1 }}
                  control={<Switch checked={!!value} onChange={onChange} />}
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
                handleCloseEditForm();
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

export default EditDepartment;
