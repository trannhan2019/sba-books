import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import useDebounce from "@/hooks/useDebounce";
import { apiGetListDepartment } from "@/apis/department";
import { apiGetAllRole } from "@/apis/role";
import { apiGetAllUser } from "@/apis/user";
import AddCategory from "./AddCategory";

const CategoryBook = () => {
  const { isLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);
  // console.log(searchDebounce);

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

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  //   const fetchUsers = async (page, item_per_page, search, selectDepartment) => {
  //     try {
  //       setLoadingData(true);
  //       const response = await apiGetAllUser({
  //         page,
  //         item_per_page,
  //         search,
  //         selectDepartment,
  //       });
  //       setUsers(response.data);
  //       setLoadingData(false);
  //     } catch (error) {
  //       setLoadingData(false);
  //       console.log("get all user", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUsers(page, itemPerPage, search, selectDepartment);
  //   }, [page, itemPerPage, searchDebounce, reloadPage, selectDepartment]);

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
              <Typography variant="h4">Danh mục sách</Typography>
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
            {/* <SearchUser
              onSearch={setSearch}
              departmentList={departmentList}
              selectDepartment={selectDepartment}
              setSelectDepartment={setSelectDepartment}
            /> */}
            {/* <ListUser
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
            /> */}
          </Stack>
        </Container>
      </Box>
      <AddCategory
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
      />
      {/* <EditUser
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        departmentList={departmentList}
        user={user}
        roleList={roleList}
        setReloadPage={setReloadPage}
      /> */}
    </>
  );
};

export default CategoryBook;
