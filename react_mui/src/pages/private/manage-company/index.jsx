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

import { CompanyList } from "./list";
import { SearchBar } from "./search";
import AddCompany from "./add";
import { apiGetAllCompany } from "@/apis/company";
import useDebounce from "@/hooks/useDebounce";
import EditCompany from "./edit";
import { useDispatch } from "react-redux";
import { setCompanies, setTotalCompany } from "@/store/company/companySlice";
import { setLoading } from "@/store/app/appSlice";

const Company = () => {
  const dispatch = useDispatch();
  //Add modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  //load companies
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

  const [searchName, setSearchName] = useState("");
  const searchNameDebounce = useDebounce(searchName, 800);

  const fetchCompanies = async (page, item_per_page, search_name) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetAllCompany({
        page,
        item_per_page,
        search_name,
      });
      dispatch(setCompanies(response.data.data));
      dispatch(setTotalCompany(response.data.meta?.total));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all companies error", error);
    }
  };
  useEffect(() => {
    fetchCompanies(page, itemPerPage, searchName);
  }, [page, itemPerPage, searchNameDebounce, reloadPage]);

  //handle Edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const handleOpenDialogEdit = () => setOpenDialogEdit(true);
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

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
              <Stack spacing={1}>
                <Typography variant="h4">Danh sách Công ty</Typography>
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
            <SearchBar
              onSearchName={setSearchName}
              handlePageReset={handlePageReset}
            />
            <CompanyList
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              handleOpenDialogEdit={handleOpenDialogEdit}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
      <AddCompany
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        setReloadPage={setReloadPage}
      />
      <EditCompany
        openDialogEdit={openDialogEdit}
        handleCloseDialogEdit={handleCloseDialogEdit}
        setReloadPage={setReloadPage}
      />
    </>
  );
};

export default Company;
