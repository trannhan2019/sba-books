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
import AddDepartment from "./add";
import { apiGetAllDepartment } from "@/apis/department";
import ListDepartment from "./list";
import { apiGetAllCompanyforSelect } from "@/apis/company";
import EditDepartment from "./edit";
import SearchDepartment from "./search";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/store/company/companySlice";
import { setLoading } from "@/store/app/appSlice";
import {
  setDepartments,
  setTotalDepartment,
} from "@/store/department/departmentSlice";

const ManageDepartment = () => {
  const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  //load fetch departments

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

  const fetchDepartments = async (page, item_per_page, search) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetAllDepartment({
        page,
        item_per_page,
        search,
      });
      dispatch(setDepartments(response.data.data));
      dispatch(setTotalDepartment(response.data.meta.total));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all department", error);
    }
  };

  useEffect(() => {
    fetchDepartments(page, itemPerPage, search);
  }, [page, itemPerPage, searchDebounce, reloadPage]);

  //lay danh sach company de truyen den add va edit form
  const getCompanyList = async () => {
    const response = await apiGetAllCompanyforSelect();
    dispatch(setCompanies(response.data.data));
  };
  useEffect(() => {
    getCompanyList();
  }, []);

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
            <SearchDepartment
              onSearch={setSearch}
              handlePageReset={handlePageReset}
            />
            <ListDepartment
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              handleOpenEditForm={handleOpenEditForm}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
      <AddDepartment
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
        setReloadPage={setReloadPage}
      />
      <EditDepartment
        openEditForm={openEditForm}
        handleCloseEditForm={handleCloseEditForm}
        setReloadPage={setReloadPage}
      />
    </>
  );
};

export default ManageDepartment;
