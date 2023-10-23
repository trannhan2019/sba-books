import { useState, useEffect } from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import DashboardLayout from "@/layouts/DashboardLayout";

import { CompaniesTable } from "./CompaniesTable";
import { SearchBar } from "./SearchBar";
import AddCompany from "./AddCompany";
import { apiGetAllCompany } from "@/apis/company";
import useDebounce from "@/hooks/useDebounce";

// const now = new Date();

const Companies = () => {
  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //companies
  const [page, setPage] = useState(0);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  const [searchName, setSearchName] = useState("");
  const searchNameDebounce = useDebounce(searchName, 800);

  const [companies, setCompanies] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const fetchCompanies = async (page, item_per_page, search_name) => {
    try {
      setLoadingData(true);
      const response = await apiGetAllCompany({
        page,
        item_per_page,
        search_name,
      });
      setCompanies(response.data);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      console.log("get all companies", error);
    }
  };
  useEffect(() => {
    fetchCompanies(page, itemPerPage, searchName);
  }, [page, itemPerPage, searchNameDebounce]);

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
              <Stack spacing={1}>
                <Typography variant="h4">Companies</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={handleOpenModal}
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
            <SearchBar onSearchName={setSearchName} />
            <CompaniesTable
              onLoading={loadingData}
              count={companies?.meta?.total}
              items={companies?.data}
              page={page}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
            />
          </Stack>
        </Container>
      </Box>
      <AddCompany openModal={openModal} handleCloseModal={handleCloseModal} />
    </DashboardLayout>
  );
};

export default Companies;
