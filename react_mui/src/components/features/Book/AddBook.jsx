import { useState } from "react";
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
import { useSelector } from "react-redux";
import ImageInput from "@/components/common/ImageInput";
import { apiStoreBook } from "@/apis/book";

const scheme = Yup.object({
  title: Yup.string().required("Tiêu đề sách không để trống"),
  description: Yup.string().required("Mô tả không để trống"),
  quantity: Yup.number().required(),
  code: Yup.string().required("Mã sách không được để trống"),
  storage_location: Yup.string().required("Nơi lưu trữ không được để trống"),
  category_book_id: Yup.string().required("Chọn danh mục"),
}).required();

const AddBook = ({ openAddForm, setOpenAddForm }) => {
  const { cateBooks } = useSelector((state) => state.cateBook);

  const hookForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      quantity: 0,
      author: "",
      photo: "",
      code: "",
      storage_location: "",
      more_info: "",
      category_book_id: "",
      photo: [],
    },
    resolver: yupResolver(scheme),
  });

  const { control, handleSubmit, reset, setValue } = hookForm;

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      const formData = new FormData();
      for (const key in values) {
        if (key === "field") {
          formData.append(key, values[key][1]);
        } else {
          formData.append(key, values[key]);
        }
      }
      //   console.log(formData.getAll);
      await apiStoreBook(formData);
      reset();
      setOpenAddForm(false);
      //   setReloadPage((preState) => !preState);
      toast.success("Tạo mới thành công");
    } catch (error) {
      console.log("add book", error);
      toast.error("Lỗi không thêm được thông tin");
    }
  };

  return (
    <Box>
      <Dialog open={openAddForm} onClose={() => false} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle sx={{ mb: 2 }}>Thêm thông tin</DialogTitle>
          <DialogContent>
            <Controller
              name="title"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  required
                  margin="normal"
                  label="Tiêu đề sách"
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
              name="category_book_id"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth required error={!!error} margin="normal">
                  <InputLabel>Chọn danh mục</InputLabel>
                  <Select
                    value={value}
                    label="Chọn danh mục"
                    onChange={onChange}
                    error={!!error}
                  >
                    {cateBooks?.length > 0 &&
                      cateBooks.map((item) => (
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
              name="description"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  multiline
                  rows={5}
                  margin="normal"
                  label="Mô tả"
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

            <ImageInput form={hookForm} name="photo" />

            <Controller
              name="author"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Tác giả"
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
              name="quantity"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="normal"
                  required
                  label="Số lượng"
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

            <Controller
              name="code"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Mã sách"
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
              name="storage_location"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  margin="normal"
                  label="Nơi lưu"
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
              name="more_info"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  multiline
                  rows={2}
                  margin="normal"
                  label="Thông tin thêm"
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

export default AddBook;
