import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";
import BgImg from "@/assets/auth-bg.jpg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// TODO: Change subtitle text

const AuthLayout = (props) => {
  const { children } = props;
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn && user) return <Navigate to={"/"} />;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          flex: "1 1 auto",
          flexFlow: { md: "row-reverse" },
        }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
            backgroundImage: `url(${BgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
