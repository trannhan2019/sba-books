import { useState } from "react";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
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
import EditCompany from "./edit";
import { useQuery } from "@tanstack/react-query";
import { usePaginateMui } from "@/hooks/usePaginateMui";

const ManageCompany = () => {
  //Add modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //handle Edit
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const handleOpenDialogEdit = () => setOpenDialogEdit(true);
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  const [company, setCompany] = useState(null);

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

  const [searchName, setSearchName] = useState("");

  const { isLoading, data: companiesData } = useQuery({
    queryKey: ["company-list", page, itemPerPage, searchName, reloadPage],
    queryFn: () => {
      return apiGetAllCompany({
        page,
        item_per_page: itemPerPage,
        search_name: searchName,
      });
    },
  });

  // const isFetching = useIsFetching();
  // const isMutating = useIsMutating();

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
              <Stack spacing={1}>
                <Typography variant="h4">Danh sách Công ty</Typography>
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
              companies={companiesData?.data.data || []}
              total={companiesData?.data.meta?.total || 0}
              isLoading={isLoading}
              setCompany={setCompany}
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
        company={company}
      />
    </>
  );
};

export default ManageCompany;
