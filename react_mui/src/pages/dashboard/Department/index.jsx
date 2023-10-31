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
import DashboardLayout from "@/layouts/DashboardLayout";
import AddDepartment from "./AddDepartment";
import { apiGetAllDepartment } from "@/apis/department";
import ListDepartment from "./ListDepartment";
import { apiGetAllCompanyforSelect } from "@/apis/company";
import EditDepartment from "./EditDepartment";
import SearchDepartment from "./SearchDepartment";

const Department = () => {
  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);
  console.log(searchDebounce);

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  const [department, setDepartment] = useState(null);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  //load fetch departments
  const [departments, setDepartments] = useState([]);
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

  const fetchDepartments = async (page, item_per_page, search) => {
    try {
      setLoadingData(true);
      const response = await apiGetAllDepartment({
        page,
        item_per_page,
        search,
      });
      setDepartments(response.data);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      console.log("get all department", error);
    }
  };

  useEffect(() => {
    fetchDepartments(page, itemPerPage, search);
  }, [page, itemPerPage, searchDebounce, reloadPage]);

  //lay danh sach company de truyen den add va edit form
  const getCompanyList = async () => {
    const response = await apiGetAllCompanyforSelect();
    setCompanyList(response.data.data);
  };
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    getCompanyList();
  }, []);

  console.log("deparment render", companyList);
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
              <Typography variant="h4">Danh sách Phòng Ban</Typography>
              <div>
                <Button
                  onClick={handleOpenAddForm}
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
            <SearchDepartment onSearch={setSearch} />
            <ListDepartment
              onLoading={loadingData}
              count={departments?.meta?.total}
              items={departments?.data}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              handleOpenEditForm={handleOpenEditForm}
              setDepartment={setDepartment}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
      <AddDepartment
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
        companyList={companyList}
        setReloadPage={setReloadPage}
      />
      <EditDepartment
        openEditForm={openEditForm}
        handleCloseEditForm={handleCloseEditForm}
        companyList={companyList}
        department={department}
        setReloadPage={setReloadPage}
      />
    </DashboardLayout>
  );
};

export default Department;
