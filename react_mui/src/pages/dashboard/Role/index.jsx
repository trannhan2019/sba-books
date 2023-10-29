import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddRole from "./AddRole";
import ListRole from "./ListRole";
import { apiGetAllRole } from "@/apis/role";
import EditRole from "./EditRole";

const Role = () => {
  //Add
  const [openAddForm, setOpenAddForm] = useState(false);
  //Edit
  const [openEditForm, setOpenEditForm] = useState(false);
  const [role, setRole] = useState(null);
  //Reload
  const [reloadPage, setReloadPage] = useState(false);
  //role list
  const [roles, setRoles] = useState([]);
  //loading
  const [loadingData, setLoadingData] = useState(false);
  //fetch data
  const fetchRoles = async () => {
    try {
      setLoadingData(true);
      const response = await apiGetAllRole();
      setRoles(response);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      console.log("get all role", error);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, [reloadPage]);
  console.log(roles);

  return (
    <DashboardLayout>
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
              onLoading={loadingData}
              items={roles}
              setOpenEditForm={setOpenEditForm}
              setRole={setRole}
              setReloadPage={setReloadPage}
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
        role={role}
        setReloadPage={setReloadPage}
      />
    </DashboardLayout>
  );
};

export default Role;
