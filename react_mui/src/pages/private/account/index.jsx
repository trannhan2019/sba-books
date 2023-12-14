import { useCallback, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AccountInfo } from "./account-info";

const Account = () => {
  const { user } = useSelector((state) => state.auth);

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
          <AccountInfo />
        </Container>
      </Box>
    </>
  );
};

export default Account;
