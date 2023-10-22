import React from "react";
import Modal from "@mui/material/Modal";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
};

const AddCompany = ({ openModal, handleOpenModal, handleCloseModal }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      alias: "",
      isActive: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Tên công ty không để trống"),
      alias: Yup.string().max(255).required("Tên viết tắt không để trống"),
    }),
    onSubmit: async (values) => {
      try {
        // await auth.signUp(values.email, values.name, values.password);
        // router.push('/');
        toast.success("Success");
        console.log(values);
      } catch (err) {
        toast.error("Error !!!");
      }
    },
  });

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Card>
            <CardHeader
              title="Thêm thông tin Công ty"
              sx={{ paddingTop: 4, paddingBottom: 0 }}
            />
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Tên Công ty"
                    type="text"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={!!(formik.touched.name && formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Tên viết tắt"
                    type="text"
                    name="alias"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.alias}
                    error={!!(formik.touched.alias && formik.errors.alias)}
                    helperText={formik.touched.alias && formik.errors.alias}
                  />
                  <FormControlLabel
                    sx={{ justifyContent: "start" }}
                    // value="start"
                    control={
                      <Switch
                        name="isActive"
                        onChange={formik.handleChange}
                        checked={formik.values.isActive}
                      />
                    }
                    label="Trạng thái"
                    labelPlacement="start"
                  />

                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Button
                      onClick={() => {
                        handleCloseModal();
                        formik.resetForm();
                      }}
                      variant="outlined"
                    >
                      Đóng
                    </Button>
                    <Button type="submit" variant="contained">
                      Thêm
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </form>
          </Card>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddCompany;
