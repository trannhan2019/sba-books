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
import { usePaginateMui } from "@/hooks/usePaginateMui";
import { useQuery } from "@tanstack/react-query";
// import EditDepartment from "./EditDepartment";

const ManageUser = () => {
  // const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  // const searchDebounce = useDebounce(search, 800);
  // console.log(searchDebounce);
  // const { departmentId } = useSelector((state) => state.department);

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  const [departmentId, setDepartmentId] = useState(0);

  const {
    page,
    pageMui,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
  } = usePaginateMui();

  const { isLoading, data: usersData } = useQuery({
    queryKey: [
      "user-list",
      page,
      itemPerPage,
      search,
      departmentId,
      reloadPage,
    ],
    queryFn: () => {
      return apiGetAllUser({
        page,
        item_per_page: itemPerPage,
        search,
        selectDepartment: departmentId,
      });
    },
  });

  // get danh sách role và phòng ban truyền form add và edit
  const { data: departmentsData } = useQuery({
    queryKey: ["department-all"],
    queryFn: () => {
      return apiGetListDepartment();
    },
  });
  const { data: rolesData } = useQuery({
    queryKey: ["role-all"],
    queryFn: () => {
      return apiGetAllRole();
    },
  });

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
              departments={departmentsData.data}
              departmentId={departmentId}
              setDepartmentId={setDepartmentId}
            />
            <ListUser
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
              isLoading={isLoading}
              userList={usersData?.data.data || []}
              total={usersData?.data.total || 0}
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

export default ManageUser;
