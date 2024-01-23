import {
  Button,
  TextField,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { apiUpdatePasswordUser } from "@/apis/user";

const scheme = Yup.object({
  password: Yup.string().required("Mật khẩu không để trống").min(6),
}).required();

export const AccountInfo = () => {
  const { user } = useSelector((state) => state.auth);

  const [changePassword, setChangePassword] = useState(false);

  const hookForm = useForm({
    defaultValues: {
      password: "Thebestpasswordever123#",
    },
    resolver: yupResolver(scheme),
  });
  const { control, handleSubmit, reset } = hookForm;

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await apiUpdatePasswordUser(user.id, values);
      toast.success("Thay đổi mật khẩu thành công");
    } catch (error) {
      console.log("error", error);
      toast.error("Lỗi không thay đổi được thông tin");
    }
  };

  return (
    <Grid xs={12} md={8}>
      <Stack alignItems="center" direction="row" spacing={2} mb={2}>
        <Typography variant="body1">Họ và tên: </Typography>
        <Typography variant="h6">{user.name}</Typography>
      </Stack>

      <Stack alignItems="center" direction="row" spacing={2} mb={2}>
        <Typography variant="body1">Tên đăng nhập: </Typography>
        <Typography variant="h6">{user.username}</Typography>
      </Stack>

      <Stack spacing={3}>
        <FormControlLabel
          sx={{ justifyContent: "start", ml: 0, mt: 1 }}
          control={
            <Switch
              onChange={(event) => setChangePassword(event.target.checked)}
            />
          }
          label="Thay đổi mật khẩu"
          labelPlacement="start"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" spacing={1}>
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextField
                  autoFocus
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  disabled={!changePassword}
                  label="Mật khẩu"
                  type="password"
                  sx={{
                    flexGrow: 1,
                    ...(!changePassword && {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }),
                  }}
                />
              )}
            />

            <Button
              variant="contained"
              disabled={!changePassword}
              type="submit"
            >
              Change
            </Button>
          </Stack>
        </form>
      </Stack>
    </Grid>
  );
};
