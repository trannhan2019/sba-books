// import Camera01Icon from "@untitled-ui/icons-react/build/esm/Camera01";
// import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import { useCallback, useState } from "react";

export const AccountInfo = () => {
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  return (
    <Stack spacing={4}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Stack alignItems="center" direction="row" spacing={2}>
                <Box
                  sx={{
                    borderColor: "neutral.300",
                    borderRadius: "50%",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    p: "4px",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        backgroundColor: (theme) =>
                          alpha(theme.palette.neutral[700], 0.5),
                        borderRadius: "50%",
                        color: "common.white",
                        cursor: "pointer",
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        left: 0,
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        zIndex: 1,
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <SvgIcon color="inherit">
                          {/* <Camera01Icon /> */}
                        </SvgIcon>
                        <Typography
                          color="inherit"
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          Select
                        </Typography>
                      </Stack>
                    </Box>
                    <Avatar
                      src={user.photo}
                      sx={{
                        height: 100,
                        width: 100,
                      }}
                    >
                      <SvgIcon>{/* <User01Icon /> */}</SvgIcon>
                    </Avatar>
                  </Box>
                </Box>
                <Button color="inherit" size="small">
                  Change
                </Button>
              </Stack>
            </Grid>
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
                      onChange={(event) =>
                        setChangePassword(event.target.checked)
                      }
                    />
                  }
                  label="Thay đổi mật khẩu"
                  labelPlacement="start"
                />
                <form>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      variant="outlined"
                      disabled={!changePassword}
                      label="Mật khẩu"
                      type="password"
                      defaultValue="Thebestpasswordever123#"
                      sx={{
                        flexGrow: 1,
                        ...(!changePassword && {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderStyle: "dotted",
                          },
                        }),
                      }}
                    />
                    {changePassword && (
                      <Button
                        variant="contained"
                        disabled={!changePassword}
                        onClick={handleEdit}
                      >
                        Change
                      </Button>
                    )}
                  </Stack>
                </form>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};
