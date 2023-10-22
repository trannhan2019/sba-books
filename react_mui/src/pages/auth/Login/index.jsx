import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AuthLayout from "@/layouts/AuthLayout";

const Login = () => {
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
              <form noValidate>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Your Username"
                    name="username"
                    type="text"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Stack>
                {/* {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )} */}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Login;
