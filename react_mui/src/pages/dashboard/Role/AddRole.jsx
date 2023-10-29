import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button } from "@mui/material";
import { apiStoreRole } from "@/apis/role";

const scheme = Yup.object({
  name: Yup.string().required("Tên Quyền không để trống"),
}).required();

const AddRole = ({ openAddForm, setOpenAddForm, setReloadPage }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await apiStoreRole(values);
      reset();
      setOpenAddForm(false);
      setReloadPage((preState) => !preState);
      toast.success("Tạo mới thành công");
    } catch (error) {
      console.log("add role", error);
      toast.error("Lỗi không thêm được thông tin");
    }
  };

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
              name="name"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Thêm tên quyền"
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

export default AddRole;
