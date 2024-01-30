import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddBook from "./add";
import { apiGetAllCategoryBook } from "@/apis/category_book";
// import { setCateBooks } from "@/store/category_book/catebookSlice";
// import { setLoading } from "@/store/app/appSlice";
import { apiGetListBook } from "@/apis/book";
// import { setBooks, setTotalBook } from "@/store/book/bookSlice";
// import useDebounce from "@/hooks/useDebounce";
import ListBook from "./list";
import SearchBook from "./search";
import EditBook from "./edit";
import { usePaginateMui } from "@/hooks/usePaginateMui";
import { useQuery } from "@tanstack/react-query";

const ManageBook = () => {
  //   const dispatch = useDispatch();
  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);
  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);

  //search
  const [search, setSearch] = useState("");
  // const searchDebounce = useDebounce(search, 800);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(0);

  //cac state
  // const [cateBooks, setCateBooks] = useState([]);
  const [cateSelected, setCateSelected] = useState([]);
  const [book, setBook] = useState(null);

  //paginate
  const {
    page,
    pageMui,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
  } = usePaginateMui();

  const { isLoading, data: booksData } = useQuery({
    queryKey: [
      "book-list",
      page,
      itemPerPage,
      search,
      cateSelected,
      reloadPage,
    ],
    queryFn: () => {
      return apiGetListBook({
        page,
        itemPerPage,
        search,
        cateSelected,
      });
    },
  });

  // get danh muc sach truyền form add và edit
  //   const getCategoryBookList = async () => {
  //     const res = await apiGetAllCategoryBook();
  //     setCateBooks(res.data);
  //   };

  //   useEffect(() => {
  //     getCategoryBookList();
  //   }, []);
  const { data: cateBooksData } = useQuery({
    queryKey: ["cate-book-all"],
    queryFn: () => {
      return apiGetAllCategoryBook();
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Container maxWidth="xxl">
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
            <SearchBook
              onSearch={setSearch}
              cateBooks={cateBooksData?.data || []}
              setCateSelected={setCateSelected}
              handlePageReset={handlePageReset}
            />
            <ListBook
              books={booksData?.data.data || []}
              total={booksData?.data.total || 0}
              page={pageMui}
              rowsPerPage={itemPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              onPageChange={handlePageChange}
              setOpenEditForm={setOpenEditForm}
              setReloadPage={setReloadPage}
              setBook={setBook}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
      <AddBook
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
        cateBooks={cateBooksData?.data || []}
      />
      <EditBook
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setReloadPage={setReloadPage}
        book={book}
        cateBooks={cateBooksData?.data || []}
      />
    </>
  );
};

export default ManageBook;
