import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { apiGetAllCategoryBook } from "@/apis/category_book";
import { setCateBooks } from "@/store/category_book/catebookSlice";
import { setLoading } from "@/store/app/appSlice";
import { apiGetListBook } from "@/apis/book";
import { setBooks, setTotalBook } from "@/store/book/bookSlice";
import useDebounce from "@/hooks/useDebounce";
import ListBook from "./list";
import SearchBook from "./search";
import GridBook from "./grid";

const Book = () => {
  const dispatch = useDispatch();

  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

  //cac state
  const [bookList, setBookList] = useState({ books: [], total: 0 });
  const [cateBooks, setCateBooks] = useState([]);
  const [cateSelected, setCateSelected] = useState([]);
  const [book, setBook] = useState(null);
  const [isGrid, setIsGrid] = useState(true);

  //paginate
  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };
  //fix bug search hoac chon catebook khi page lon hon 1 se khong co ket qua
  const handlePageReset = () => {
    setPageMui(0);
    setPage(1);
  };

  const [itemPerPage, setItemPerPage] = useState(5);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

  //featch data
  const fetchBooks = async (page, itemPerPage, search, cateSelected) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetListBook({
        page,
        itemPerPage,
        search,
        cateSelected,
      });
      console.log(response);
      setBookList({ books: response.data.data, total: response.data.total });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all department", error);
    }
  };

  useEffect(() => {
    fetchBooks(page, itemPerPage, search, cateSelected);
  }, [page, itemPerPage, searchDebounce, reloadPage, cateSelected]);

  // get danh muc sach truyền form add và edit
  const getCategoryBookList = async () => {
    const res = await apiGetAllCategoryBook();
    setCateBooks(res.data);
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
          pt: 2,
        }}
      >
        <Container maxWidth="xxl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Quản lý sách</Typography>
              {/* group button change list grid */}
              <ButtonGroup>
                <Tooltip title="hiển thị dạng lưới">
                  <IconButton onClick={() => setIsGrid(true)} disabled={isGrid}>
                    <GridViewIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="hiển thị dạng danh sách">
                  <IconButton
                    onClick={() => setIsGrid(false)}
                    disabled={!isGrid}
                  >
                    <ViewListOutlinedIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </Stack>
            <SearchBook
              onSearch={setSearch}
              cateBooks={cateBooks}
              setCateSelected={setCateSelected}
              handlePageReset={handlePageReset}
            />
            {isGrid ? (
              <GridBook />
            ) : (
              <ListBook
                books={bookList.books}
                total={bookList.total}
                page={pageMui}
                rowsPerPage={itemPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                onPageChange={handlePageChange}
                setReloadPage={setReloadPage}
                setBook={setBook}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Book;
