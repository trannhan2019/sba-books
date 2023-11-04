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
import useDebounce from "@/hooks/useDebounce";
import DashboardLayout from "@/layouts/MainLayout";
import AddUser from "./AddUser";
import { apiGetListDepartment } from "@/apis/department";
import { apiGetAllRole } from "@/apis/role";
import { apiGetAllUser } from "@/apis/user";
import ListUser from "./ListUser";
import SearchUser from "./SearchUser";
import EditUser from "./EditUser";
// import EditDepartment from "./EditDepartment";

const User = () => {
  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);
  // console.log(searchDebounce);
  const [selectDepartment, setSelectDepartment] = useState("");

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  const [user, setUser] = useState(null);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  //load fetch user list
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  const fetchUsers = async (page, item_per_page, search, selectDepartment) => {
    try {
      setLoadingData(true);
      const response = await apiGetAllUser({
        page,
        item_per_page,
        search,
        selectDepartment,
      });
      setUsers(response.data);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      console.log("get all user", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, itemPerPage, search, selectDepartment);
  }, [page, itemPerPage, searchDebounce, reloadPage, selectDepartment]);

  // get danh sách role và phòng ban truyền form add và edit
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const getDepartmentAndRoleList = async () => {
    const departments = await apiGetListDepartment();
    setDepartmentList(departments.data);
    const roles = await apiGetAllRole();
    setRoleList(roles.data);
  };
  useEffect(() => {
    getDepartmentAndRoleList();
  }, []);

  // console.log("deparment render", reloadPage);
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
              <Typography variant="h4">Danh sách người dùng</Typography>
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
            <SearchUser
              onSearch={setSearch}
              departmentList={departmentList}
              selectDepartment={selectDepartment}
              setSelectDepartment={setSelectDepartment}
            />
            <ListUser
              onLoading={loadingData}
              count={users?.total}
              items={users?.data}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setUser={setUser}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
      <AddUser
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        departmentList={departmentList}
        roleList={roleList}
        setReloadPage={setReloadPage}
      />
      <EditUser
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        departmentList={departmentList}
        user={user}
        roleList={roleList}
        setReloadPage={setReloadPage}
      />
    </DashboardLayout>
  );
};

export default User;
