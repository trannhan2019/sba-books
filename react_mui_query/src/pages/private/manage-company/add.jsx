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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { apiStoreCompany } from "@/apis/company";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
};

const scheme = Yup.object({
  name: Yup.string().required("Tên Công ty không để trống"),
  alias: Yup.string().required("Tên viết tắt không để trống"),
  // isActive:Yup.boolean()
}).required();

const AddCompany = ({ openModal, handleCloseModal, setReloadPage }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      alias: "",
      isActive: true,
    },
    resolver: yupResolver(scheme),
  });

  // const onSubmit = async (values) => {
  //   try {
  //     await apiStoreCompany(values);
  //     reset();
  //     toast.success("Tạo mới thành công");
  //     setReloadPage((preState) => preState + 1);
  //     handleCloseModal();
  //   } catch (error) {
  //     console.log("add company", error);
  //     toast.error("Lỗi không thêm được thông tin");
  //   }
  // };
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (values) => apiStoreCompany(values),
  });

  const onSubmit = async (values) => {
    addMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["company-list"] });
        reset();
        toast.success("Tạo mới thành công");
        handleCloseModal();
      },
      onError: (error) => {
        console.log("add company", error);
        toast.error("Lỗi không thêm được thông tin");
      },
    });
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Stack spacing={2}>
                  <Controller
                    name="name"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        label="Tên Công ty"
                        type="text"
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
                        fullWidth
                        label="Tên viết tắt"
                        type="text"
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
                        sx={{ justifyContent: "start" }}
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

                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Button
                      onClick={() => {
                        handleCloseModal();
                        reset();
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
