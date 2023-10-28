import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import useDebounce from "@/hooks/useDebounce";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddDepartment from "./AddDepartment";
import { apiGetAllDepartment } from "@/apis/department";
import ListDepartment from "./ListDepartment";
import { apiGetAllCompanyforSelect } from "@/apis/company";
import EditDepartment from "./EditDepartment";

const Departments = () => {
  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  const [department, setDepartment] = useState(null);

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

  const [search, setSearch] = useState("");

  const fetchDepartments = async (page, item_per_page, search) => {
    try {
      setLoadingData(true);
      const response = await apiGetAllDepartment({
        page,
        item_per_page,
        search,
      });
      setDepartments(response);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      console.log("get all department", error);
    }
  };

  useEffect(() => {
    fetchDepartments(page, itemPerPage, search);
  }, [page, itemPerPage, search]);

  //lay danh sach company de truyen den add va edit form
  const getCompanyList = async () => {
    const response = await apiGetAllCompanyforSelect();
    setCompanyList(response.data);
  };
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    getCompanyList();
  }, []);

  console.log("deparment render");
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
            {/* <SearchBar
              onSearchName={setSearchName}
              selected={selected}
              handleDeleteAll={handleDeleteAll}
            /> */}
            <ListDepartment
              onLoading={loadingData}
              count={departments?.meta?.total}
              items={departments?.data}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              // selected={selected}
              // onSelected={setSelected}
              // handleDeleteOne={handleDeleteOne}
              handleOpenEditForm={handleOpenEditForm}
              setDepartment={setDepartment}
            />
          </Stack>
        </Container>
      </Box>
      <AddDepartment
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
        handleRefreshData={fetchDepartments}
        companyList={companyList}
        setPageMui={setPageMui}
      />
      <EditDepartment
        openEditForm={openEditForm}
        handleCloseEditForm={handleCloseEditForm}
        handleRefreshData={fetchDepartments}
        companyList={companyList}
        department={department}
        setPageMui={setPageMui}
      />
    </DashboardLayout>
  );
};

export default Departments;
