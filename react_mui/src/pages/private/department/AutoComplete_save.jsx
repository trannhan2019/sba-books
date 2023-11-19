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
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { apiStoreDepartment } from "@/apis/department";

const scheme = Yup.object({
  name: Yup.string().required("Tên Phòng ban không để trống"),
  alias: Yup.string().required("Tên viết tắt không để trống"),
  location: Yup.number().required("Thứ tự không được để trống"),
  company_id: Yup.string().required(),
}).required();

const AddDepartment = ({ openAddForm, handleCloseAddForm }) => {
  const [companyList, setCompanyList] = useState([]);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      alias: "",
      isActive: true,
      location: 0, //call api get count +1
      company_id: "",
    },
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    console.log(values);
    // try {
    //   await apiStoreDepartment(values);
    //   reset();
    //   handleCloseAddForm();
    //   toast.success("Tạo mới thành công");
    //   //       fetchCompanies();
    // } catch (error) {
    //   console.log("add department", error);
    //   toast.error("Lỗi không thêm được thông tin");
    // }
  };

  useEffect(() => {
    setCompanyList();
    setValue();
  }, []);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ mb: 2 }}>Thêm thông tin</DialogTitle>
          <DialogContent>
            <Controller
              name="company_id"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  //   disablePortal
                  fullWidth
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={value}
                  options={itemList}
                  getOptionLabel={(item) => (item.name ? item.name : "")}
                  getOptionSelected={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      required
                      label="Chọn Công ty"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
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
