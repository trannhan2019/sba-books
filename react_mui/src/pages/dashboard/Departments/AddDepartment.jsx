import React, { useEffect, useState } from "react";
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
import { apiGetCountDepartment, apiStoreDepartment } from "@/apis/department";
import { apiGetAllCompanyforSelect } from "@/apis/company";

const scheme = Yup.object({
  name: Yup.string().required("Tên Phòng ban không để trống"),
  alias: Yup.string().required("Tên viết tắt không để trống"),
  location: Yup.number().required("Thứ tự không được để trống"),
  company_id: Yup.string().required("Chọn Công ty"),
}).required();

const AddDepartment = ({
  openAddForm,
  handleCloseAddForm,
  handleRefreshData,
  companyList,
  setPageMui,
}) => {
  const [countDepartment, setcountDepartment] = useState(0);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      alias: "",
      isActive: true,
      location: countDepartment > 0 ? countDepartment : 0,
      company_id: "",
    },
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await apiStoreDepartment(values);
      reset();
      handleCloseAddForm();
      setPageMui(0); //set lai panigation cua MUI
      toast.success("Tạo mới thành công");
      //refresh Data
      handleRefreshData();
    } catch (error) {
      console.log("add department", error);
      toast.error("Lỗi không thêm được thông tin");
    }
  };

  const fetchData = async () => {
    try {
      const rescountDepartment = await apiGetCountDepartment();
      setcountDepartment(rescountDepartment + 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValue("location", countDepartment);
  }, [openAddForm]);

  console.log("add department render");

  return (
    <Box>
      <Dialog
        open={openAddForm}
        onClose={() => false}
        sx={{ top: "-30%" }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle sx={{ mb: 2 }}>Thêm thông tin</DialogTitle>
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
                    {companyList.length > 0 &&
                      companyList.map((item) => (
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
                handleCloseAddForm();
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

export default AddDepartment;
