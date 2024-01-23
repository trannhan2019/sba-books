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
import { apiGetCategoryBook } from "@/apis/category_book";
import AddCategory from "./add";
import ListCategory from "./list";
import EditCategory from "./edit";
import SearchCategory from "./search";
import { useQuery } from "@tanstack/react-query";
import { usePaginateMui } from "@/hooks/usePaginateMui";

const ManageCategoryBook = () => {
  //search
  const [search, setSearch] = useState("");

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);

  const [reloadPage, setReloadPage] = useState(0);

  const [cateBook, setCateBook] = useState(null);

  const {
    page,
    pageMui,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
  } = usePaginateMui();

  const { isLoading, data: cateBooksData } = useQuery({
    queryKey: ["cate-book-list", page, itemPerPage, search, reloadPage],
    queryFn: () => {
      return apiGetCategoryBook({ page, item_per_page: itemPerPage, search });
    },
  });

  //   console.log("deparment render", page, pageMui);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
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
            <SearchCategory
              onSearch={setSearch}
              handlePageReset={handlePageReset}
            />
            <ListCategory
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
              cateBooks={cateBooksData?.data.data || []}
              total={cateBooksData?.data.total || 0}
              isLoading={isLoading}
              setCateBook={setCateBook}
            />
          </Stack>
        </Container>
      </Box>
      <AddCategory
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
      />
      <EditCategory
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setReloadPage={setReloadPage}
        cateBook={cateBook}
      />
    </>
  );
};

export default ManageCategoryBook;
