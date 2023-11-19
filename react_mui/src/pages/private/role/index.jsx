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
import AddRole from "./add";
import ListRole from "./list";
import { apiGetAllRole } from "@/apis/role";
import EditRole from "./edit";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/app/appSlice";
import { setRoles } from "@/store/role/roleSlice";

const Role = () => {
  const dispatch = useDispatch();
  //Add
  const [openAddForm, setOpenAddForm] = useState(false);
  //Edit
  const [openEditForm, setOpenEditForm] = useState(false);
  //Reload
  const [reloadPage, setReloadPage] = useState(false);

  //fetch data
  const fetchRoles = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetAllRole();
      dispatch(setRoles(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all role", error);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, [reloadPage]);

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
      />
    </>
  );
};

export default Role;
