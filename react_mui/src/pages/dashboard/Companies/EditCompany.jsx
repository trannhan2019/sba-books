import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";

import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const scheme = Yup.object({
  name: Yup.string().required("Tên Công ty không để trống"),
  alias: Yup.string().required("Tên viết tắt không để trống"),
  // isActive:Yup.boolean()
}).required();

const EditCompany = ({
  openDialogEdit,
  handleCloseDialogEdit,
  handleEditCompany,
  company,
}) => {
  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    await handleEditCompany(values, company.id);
    reset();
    handleCloseDialogEdit();
  };

  useEffect(() => {
    setValue("name", company?.name);
    setValue("alias", company?.alias);
    setValue("isActive", Boolean(company?.isActive));
  }, [openDialogEdit]);

  // console.log(values);

  return (
    <Box>
      <Dialog
        open={openDialogEdit}
        onClose={() => false}
        sx={{ top: "-30%" }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Sửa thông tin</DialogTitle>
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
                  margin="normal"
                  label="Tên Công ty"
                  type="text"
                  fullWidth
                  variant="standard"
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
                  label="Tên viết tắt"
                  type="text"
                  fullWidth
                  variant="standard"
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
                  control={<Switch checked={value} onChange={onChange} />}
                  label="Trạng thái"
                  labelPlacement="start"
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ mx: 2, mb: 2 }}>
            <Button
              onClick={() => {
                reset();
                handleCloseDialogEdit();
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

export default EditCompany;
