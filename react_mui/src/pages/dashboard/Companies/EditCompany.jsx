import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const EditCompany = ({
  openDialogEdit,
  handleCloseDialogEdit,
  handleEditCompany,
  company,
}) => {
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Tên công ty không để trống"),
      alias: Yup.string().max(255).required("Tên viết tắt không để trống"),
    }),
    onSubmit: async (values) => {
      await handleEditCompany(values, company.id);
      toast.success("Sửa thông tin thành công");
      formik.resetForm();
      handleCloseDialogEdit();
    },
  });

  const {
    values = company,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    errors,
  } = formik;
  return (
    <Box>
      <Dialog
        open={openDialogEdit}
        onClose={() => false}
        sx={{ top: "-30%" }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Sửa thông tin</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              label="Tên Công ty"
              type="text"
              fullWidth
              variant="standard"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values?.name}
              error={!!(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              margin="normal"
              label="Tên viết tắt"
              type="text"
              fullWidth
              variant="standard"
              name="alias"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values?.alias}
              error={!!(touched.alias && errors.alias)}
              helperText={touched.alias && errors.alias}
            />

            <FormControlLabel
              sx={{ justifyContent: "start", ml: 0, mt: 1 }}
              // value="start"
              control={
                <Switch
                  name="isActive"
                  checked={values?.isActive}
                  onChange={handleChange}
                  // checked={formik.values.isActive}
                />
              }
              label="Trạng thái"
              labelPlacement="start"
            />
          </DialogContent>
          <DialogActions sx={{ mx: 2, mb: 2 }}>
            <Button
              onClick={() => {
                resetForm();
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
