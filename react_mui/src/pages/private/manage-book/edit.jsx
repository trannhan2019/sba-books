import { useEffect } from "react";
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
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import ImageInput from "@/components/common/ImageInput";
import { apiUpdateBook } from "@/apis/book";
import ImageInput2 from "@/components/common/ImageInput/index2,";
import EditorTiny from "@/components/common/EditorTiny";

const scheme = Yup.object({
  title: Yup.string().required("Tiêu đề sách không để trống"),
  // description: Yup.string().required("Mô tả không để trống"),
  quantity: Yup.number().required(),
  code: Yup.string().required("Mã sách không được để trống"),
  storage_location: Yup.string().required("Nơi lưu trữ không được để trống"),
  category_book_id: Yup.string().required("Chọn danh mục"),
}).required();

const EditBook = ({
  openEditForm,
  setOpenEditForm,
  setReloadPage,
  cateBooks,
  book,
}) => {
  const hookForm = useForm({
    resolver: yupResolver(scheme),
  });

  const { control, handleSubmit, reset, setValue } = hookForm;

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      let formData = new FormData();
      for (const key in values) {
        if (key === "photo") {
          formData.append(key, values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      }
      // console.log(formData.get("title"));
      await apiUpdateBook(formData, book.id);
      setOpenEditForm(false);
      setReloadPage((preState) => !preState);
      toast.success("Sửa thông tin thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi không sửa được thông tin");
    }
  };

  useEffect(() => {
    setValue("title", book?.title);
    setValue("description", book?.description);
    setValue("category_book_id", book?.cate_book.id);
    setValue("quantity", book?.quantity);
    setValue("author", book?.author);
    setValue("code", book?.code);
    setValue("storage_location", book?.storage_location);
    setValue("more_info", book?.more_info);
    setValue("photo_url", book?.photo_url);
  }, [openEditForm]);

  return (
    <Box>
      <Dialog open={openEditForm} onClose={() => false} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle sx={{ mb: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5">Sửa thông tin</Typography>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  reset();
                  setOpenEditForm(false);
                }}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
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

            <EditorTiny
              name="description"
              form={hookForm}
              label="Thông tin giới thiệu về sách"
            />

            {/* <ImageInput form={hookForm} name="photo" mode="update" /> */}
            <Stack mt={3}>
              <Typography variant="subtitle1">
                Chèn link hoặc upload hình ảnh
              </Typography>
              <Controller
                name="photo_url"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="normal"
                    label="Dán link hình ảnh"
                    placeholder="https://image.example.com"
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

              <ImageInput2 name="photo" form={hookForm} photo={book?.photo} />
            </Stack>
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

export default EditBook;
