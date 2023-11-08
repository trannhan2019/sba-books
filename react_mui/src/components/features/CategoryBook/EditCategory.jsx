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
import { Box, Button } from "@mui/material";
import { apiUpdateCategoryBook } from "@/apis/category_book";
import { useSelector } from "react-redux";

const scheme = Yup.object({
  name: Yup.string().required("Tên danh mục sách không để trống"),
}).required();

const EditCategory = ({ openEditForm, setOpenEditForm, setReloadPage }) => {
  const { cateBook } = useSelector((state) => state.cateBook);
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await apiUpdateCategoryBook(values, cateBook.id);
      reset();
      setOpenEditForm(false);
      setReloadPage((preState) => !preState);
      toast.success("Sửa thông tin thành công");
    } catch (error) {
      console.log("edit category", error);
      toast.error("Lỗi không sửa được thông tin");
    }
  };

  useEffect(() => {
    setValue("name", cateBook?.name);
  }, [openEditForm]);

  //   console.log(roleList);

  return (
    <Box>
      <Dialog
        open={openEditForm}
        onClose={() => false}
        sx={{ top: "-15%" }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle sx={{ mb: 2 }}>Sửa thông tin</DialogTitle>
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
                  label="Tên danh mục sách"
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
                setOpenEditForm(false);
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

export default EditCategory;
