import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiLogin } from "@/apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "@/store/app/appSlice";
import { setUser, setIsLoggedIn } from "@/store/user/userSlice";

const scheme = Yup.object({
  username: Yup.string().required("Tên đăng nhập không để trống"),
  password: Yup.string().min(6).required("Mật khẩu không để trống"),
}).required();

const Login = () => {
  const { isLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(scheme),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    dispatch(setLoading(true));
    try {
      const response = await apiLogin(values);
      dispatch(setUser(response.data.user));
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("token", response.data.token);
      reset();
      dispatch(setLoading(false));
      navigate("/");
      toast.success("Đăng nhập thành công");
    } catch (error) {
      dispatch(setLoading(false));
      if (error.status === 401) {
        toast.error(error.data.message);
      } else {
        console.log("login", error);
        toast.error("Lỗi không đăng nhập được");
      }
    }
  };

  return (
    <>
      <AuthLayout>
        <Box
          sx={{
            backgroundColor: "background.paper",
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: "100px",
              width: "100%",
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">Login</Typography>
              </Stack>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <Controller
                    name="username"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        autoFocus
                        required
                        margin="normal"
                        label="Tên đăng nhập"
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
                    name="password"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        required
                        margin="normal"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(event) => event.preventDefault()}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Stack>
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<LockIcon />}
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Continue
                </LoadingButton>
              </form>
            </div>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Login;
