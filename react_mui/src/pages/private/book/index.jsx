import { useState, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { apiGetAllCategoryBook } from "@/apis/category_book";
import { apiGetListBook } from "@/apis/book";
// import useDebounce from "@/hooks/useDebounce";
import ListBook from "./list";
import SearchBook from "./search";
import GridBook from "./grid";
import { setLoading } from "@/store/app/appSlice";
import { useDispatch } from "react-redux";
// import { useQuery } from "@tanstack/react-query";

const Book = () => {
  const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  // const searchDebounce = useDebounce(search, 800);

  //cac state
  const [cateBooks, setCateBooks] = useState([]);
  const [cateSelected, setCateSelected] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [booksData, setBooksData] = useState({ books: [], total: 0 });

  //paginate
  const [pageMui, setPageMui] = useState(0);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPageMui(value);
    setPage(value + 1);
  };
  const handlePageChangeGrid = (event, value) => {
    setPageMui(value - 1);
    setPage(value);
  };
  //fix bug search hoac chon catebook khi page lon hon 1 se khong co ket qua
  const handlePageReset = () => {
    setPageMui(0);
    setPage(1);
  };

  const [itemPerPage, setItemPerPage] = useState(8);
  const handleRowsPerPageChange = (event) => {
    setItemPerPage(event.target.value);
  };

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
      setBooksData({ books: response.data.data, total: response.data.total });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all department", error);
    }
  };

  useEffect(() => {
    fetchBooks(page, itemPerPage, search, cateSelected);
  }, [page, itemPerPage, search, cateSelected]);

  //su dung react query
  // const { data: booksData, isFetching } = useQuery({
  //   queryKey: ["books", page, itemPerPage, search, cateSelected],
  //   queryFn: async () => {
  //     const response = await apiGetListBook({
  //       page,
  //       itemPerPage,
  //       search,
  //       cateSelected,
  //     });
  //     return { books: response.data.data, total: response.data.total };
  //   },
  //   placeholderData: { books: [], total: 0 },
  // });

  // get danh muc sach truyền form add và edit
  const getCategoryBookList = async () => {
    const res = await apiGetAllCategoryBook();
    setCateBooks(res.data);
  };

  useEffect(() => {
    getCategoryBookList();
  }, []);

  // const { data: cateBooks } = useQuery({
  //   queryKey: ["cate-book"],
  //   queryFn: async () => {
  //     const res = await apiGetAllCategoryBook();
  //     return res.data;
  //   },
  //   placeholderData: [],
  // });

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
                  <span>
                    <IconButton
                      onClick={() => setIsGrid(true)}
                      disabled={isGrid}
                    >
                      <GridViewIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="hiển thị dạng danh sách">
                  <span>
                    <IconButton
                      onClick={() => setIsGrid(false)}
                      disabled={!isGrid}
                    >
                      <ViewListOutlinedIcon />
                    </IconButton>
                  </span>
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
              <GridBook
                books={booksData.books}
                total={Math.ceil(booksData.total / itemPerPage)}
                page={page}
                onPageChange={handlePageChangeGrid}
              />
            ) : (
              // <></>
              <ListBook
                books={booksData.books}
                total={booksData.total}
                page={pageMui}
                rowsPerPage={itemPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                onPageChange={handlePageChange}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Book;
