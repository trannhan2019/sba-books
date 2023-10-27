import { useState } from "react";
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
import { toast } from "react-toastify";
import DashboardLayout from "@/layouts/DashboardLayout";
import AddDepartment from "./AddDepartment";

const Departments = () => {
  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  //   const handleAddCompany = async (values) => {
  //     try {
  //       await apiStoreCompany(values);
  //       toast.success("Tạo mới thành công");
  //       fetchCompanies();
  //     } catch (error) {
  //       console.log("add company", error);
  //       toast.error("Lỗi không thêm được thông tin");
  //     }
  //   };
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
            {/* <CompaniesTable
              onLoading={loadingData}
              count={companies?.meta?.total}
              items={companies?.data}
              page={page}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              selected={selected}
              onSelected={setSelected}
              handleDeleteOne={handleDeleteOne}
              handleOpenDialogEdit={handleOpenDialogEdit}
              setCompany={setCompany}
            /> */}
          </Stack>
        </Container>
      </Box>
      <AddDepartment
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
        // handleAddCompany={handleAddCompany}
      />
      {/* <EditCompany
        openDialogEdit={openDialogEdit}
        handleCloseDialogEdit={handleCloseDialogEdit}
        company={company}
        handleEditCompany={handleEditCompany}
      /> */}
    </DashboardLayout>
  );
};

export default Departments;
