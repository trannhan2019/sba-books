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
import { setLoading } from "@/store/app/appSlice";
import { apiGetListBook } from "@/apis/book";
import { setBooks, setTotalBook } from "@/store/book/bookSlice";
import useDebounce from "@/hooks/useDebounce";
import ListBook from "./ListBook";

const Book = () => {
  const dispatch = useDispatch();
  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);

  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  //load fetch books
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

  const fetchBooks = async (page, item_per_page, search) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetListBook({
        page,
        item_per_page,
        search,
      });
      dispatch(setBooks(response.data.data));
      dispatch(setTotalBook(response.data.meta.total));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all department", error);
    }
  };

  useEffect(() => {
    fetchBooks(page, itemPerPage, search);
  }, [page, itemPerPage, searchDebounce, reloadPage]);

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
            <ListBook
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
            />
          </Stack>
        </Container>
      </Box>
      <AddBook
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
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
