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
import AddUser from "./add";
import { apiGetListDepartment } from "@/apis/department";
import { apiGetAllRole } from "@/apis/role";
import { apiGetAllUser } from "@/apis/user";
import ListUser from "./list";
import SearchUser from "./search";
import EditUser from "./edit";
import { useDispatch, useSelector } from "react-redux";
import { setDepartments } from "@/store/department/departmentSlice";
import { setRoles } from "@/store/role/roleSlice";
import { setTotalUser, setUserList } from "@/store/user/userSlice";
import { setLoading } from "@/store/app/appSlice";
// import EditDepartment from "./EditDepartment";

const User = () => {
  const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);
  // console.log(searchDebounce);
  const { departmentId } = useSelector((state) => state.department);

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };
  const handlePageReset = () => {
    setPageMui(0);
    setPage(1);
  };

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  const fetchUsers = async (page, item_per_page, search, selectDepartment) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetAllUser({
        page,
        item_per_page,
        search,
        selectDepartment,
      });
      dispatch(setUserList(response.data.data));
      dispatch(setTotalUser(response.data.total));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all user", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, itemPerPage, search, departmentId);
  }, [page, itemPerPage, searchDebounce, reloadPage, departmentId]);

  // get danh sách role và phòng ban truyền form add và edit
  const getDepartmentAndRoleList = async () => {
    const resDep = await apiGetListDepartment();
    dispatch(setDepartments(resDep.data));
    const resRoles = await apiGetAllRole();
    dispatch(setRoles(resRoles.data));
  };
  useEffect(() => {
    getDepartmentAndRoleList();
  }, []);

  // console.log("deparment render", reloadPage);
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
              handlePageReset={handlePageReset}
            />
            <ListUser
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
      <AddUser
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
      />
      <EditUser
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setReloadPage={setReloadPage}
      />
    </>
  );
};

export default User;
