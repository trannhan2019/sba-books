import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddRole from "./add";
import ListRole from "./list";
import { apiGetAllRole } from "@/apis/role";
import EditRole from "./edit";
import { useQuery } from "@tanstack/react-query";

const ManageRole = () => {
  //Add
  const [openAddForm, setOpenAddForm] = useState(false);
  //Edit
  const [openEditForm, setOpenEditForm] = useState(false);
  //Reload
  const [reloadPage, setReloadPage] = useState(0);

  const [role, setRole] = useState(null);

  //fetch data
  const { isLoading, data: rolesData } = useQuery({
    queryKey: ["role-list", reloadPage],
    queryFn: () => {
      return apiGetAllRole();
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Danh sách Quyền</Typography>
              <div>
                <Button
                  onClick={() => setOpenAddForm(true)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <SearchDepartment onSearch={setSearch} /> */}
            <ListRole
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
              roles={rolesData?.data || []}
              setRole={setRole}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
      <AddRole
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
      />
      <EditRole
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setReloadPage={setReloadPage}
        role={role}
      />
    </>
  );
};

export default ManageRole;
