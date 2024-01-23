import { Link } from "react-router-dom";
import { Box, ButtonBase } from "@mui/material";

export const SidebarItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  return (
    <li>
      <Link to={path} style={{ textDecoration: "none" }}>
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(active && {
              backgroundColor: "rgba(0, 0, 255, 0.1)", //0.04
            }),
            "&:hover": {
              backgroundColor: "rgba(0, 0, 255, 0.1)", //0.04
            },
          }}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.900", //400
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "primary.main",
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: "neutral.900", //400
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "primary.main",
              }),
              ...(disabled && {
                color: "neutral.300",
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      </Link>
    </li>
  );
};
