import { Drawer, useMediaQuery } from "@mui/material";
import { SidebarContent } from "./sidebar-content";
import { neutral } from "@/theme/colors";

const Sidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.50", //neutral.800
            // color: "common.white",
            width: 270,
          },
        }}
        variant="permanent"
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.50", //neutral.800
          // color: "common.white", //"common.white"
          width: 270,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
