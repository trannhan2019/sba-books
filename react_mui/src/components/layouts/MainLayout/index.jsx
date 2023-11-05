import { Box } from "@mui/material";

const SIDE_NAV_WIDTH = 280;

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flex: "1 1 auto",
        maxWidth: "100%",
        [theme.breakpoints.up("lg")]: {
          paddingLeft: SIDE_NAV_WIDTH,
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
