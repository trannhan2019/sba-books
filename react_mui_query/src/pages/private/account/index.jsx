import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Container,
  Divider,
} from "@mui/material";
// import { useSelector } from "react-redux";
import { AccountInfo } from "./account-info";
import AccountPhoto from "./account-photo";

const Account = () => {
  // const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ mb: 3 }}>
            <Typography variant="h4">Account</Typography>
            <Divider />
          </Stack>
          <Stack spacing={4}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <AccountPhoto />
                  <AccountInfo />
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Account;
