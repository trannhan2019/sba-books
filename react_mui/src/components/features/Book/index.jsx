import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddBook from "./AddBook";
import { apiGetAllCategoryBook } from "@/apis/category_book";
import { setCateBooks } from "@/store/category_book/catebookSlice";

const Book = () => {
  const dispatch = useDispatch();
  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  // get danh muc sach truyền form add và edit
  const getCategoryBookList = async () => {
    const res = await apiGetAllCategoryBook();
    dispatch(setCateBooks(res.data));
  };

  useEffect(() => {
    getCategoryBookList();
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
              <Typography variant="h4">Quản lý sách</Typography>
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
            {/* <SearchUser onSearch={setSearch} /> */}
            {/* <ListUser
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
            /> */}
          </Stack>
        </Container>
      </Box>
      <AddBook
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        // setReloadPage={setReloadPage}
      />
      {/* <EditUser
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setReloadPage={setReloadPage}
      /> */}
    </>
  );
};

export default Book;
