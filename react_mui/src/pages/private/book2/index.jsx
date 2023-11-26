import { apiGetListBook } from "@/apis/book";
import { useMounted } from "@/hooks/useMounted";
import { useState, useCallback, useEffect } from "react";
import { setLoading } from "@/store/app/appSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ListBook from "./list";
import AddBook from "./add";
import { apiGetAllCategoryBook } from "@/apis/category_book";
import { BookSearch } from "./search";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      category: [],
      // status: [],
      // inStock: undefined
    },
    page: 1,
    pageMui: 0,
    rowsPerPage: 5,
    isFetchData: false,
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useBooks = (search) => {
  const dispatch = useDispatch();
  const isMounted = useMounted();
  const [state, setState] = useState({
    books: [],
    booksCount: 0,
  });

  const getBooks = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiGetListBook(search);

      if (isMounted()) {
        setState({
          books: response.data.data,
          booksCount: response.data.total,
        });
        dispatch(setLoading(false));
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(
    () => {
      getBooks();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const useCateBook = () => {
  const isMounted = useMounted();
  const [cateBooks, setCateBooks] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await apiGetAllCategoryBook();

      if (isMounted()) {
        setCateBooks(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getData();
  }, []);

  return cateBooks;
};

const Book2 = () => {
  const { search, updateSearch } = useSearch();
  const { books, booksCount } = useBooks(search);
  const cateBooks = useCateBook();

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handlePageChange = useCallback(
    (event, page) => {
      updateSearch((prevState) => ({
        ...prevState,
        pageMui: page,
        page: page + 1,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    [updateSearch]
  );

  const handleIsFetchChange = useCallback(() => {
    updateSearch((prevState) => ({
      ...prevState,
      isFetchData: !prevState.isFetch,
    }));
  }, [updateSearch]);

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
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Books</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  onClick={() => setOpenAddForm(true)}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              {/* Search Book */}
              <BookSearch
                onFiltersChange={handleFiltersChange}
                cateBooks={cateBooks}
              />
              {/* Book List */}
              <ListBook
                books={books}
                count={booksCount}
                page={search.pageMui}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={search.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <AddBook
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={handleIsFetchChange}
        cateBooks={cateBooks}
      />
    </>
  );
};

export default Book2;
