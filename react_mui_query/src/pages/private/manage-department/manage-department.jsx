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
// import useDebounce from "@/hooks/useDebounce";
import AddDepartment from "./add";
import { apiGetAllDepartment } from "@/apis/department";
import ListDepartment from "./list";
import { apiGetAllCompanyforSelect } from "@/apis/company";
import EditDepartment from "./edit";
import SearchDepartment from "./search";
import { useQuery } from "@tanstack/react-query";
import { usePaginateMui } from "@/hooks/usePaginateMui";

const ManageDepartment = () => {
  //   const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  //   const searchDebounce = useDebounce(search, 800);

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(0);

  const {
    page,
    pageMui,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
  } = usePaginateMui();

  //react query

  const [department, setDepartment] = useState(null);

  const { isLoading, data: departmentsData } = useQuery({
    queryKey: ["department-list", page, itemPerPage, search, reloadPage],
    queryFn: () => {
      return apiGetAllDepartment({ page, item_per_page: itemPerPage, search });
    },
  });

  const { data: companies } = useQuery({
    queryKey: ["company-all"],
    queryFn: () => {
      return apiGetAllCompanyforSelect();
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
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
              total={departmentsData?.data.meta.total || 0}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              handleOpenEditForm={handleOpenEditForm}
              setReloadPage={setReloadPage}
              departments={departmentsData?.data.data || []}
              isLoading={isLoading}
              setDepartment={setDepartment}
            />
          </Stack>
        </Container>
      </Box>
      <AddDepartment
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
        setReloadPage={setReloadPage}
        companies={companies?.data.data || []}
        count={departmentsData?.data.meta.total || 0}
      />
      <EditDepartment
        openEditForm={openEditForm}
        handleCloseEditForm={handleCloseEditForm}
        companies={companies?.data.data || []}
        department={department}
        setReloadPage={setReloadPage}
      />
    </>
  );
};

export default ManageDepartment;
