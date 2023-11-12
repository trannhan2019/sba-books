import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import useDebounce from "@/hooks/useDebounce";
import { apiGetCategoryBook } from "@/apis/category_book";
import AddCategory from "./AddCategory";
import { setLoading } from "@/store/app/appSlice";
import {
  setCateBooks,
  setTotalCate,
} from "@/store/category_book/catebookSlice";
import ListCategory from "./ListCategory";
import EditCategory from "./EditCategory";
import SearchCategory from "./SearchCategory";

const CategoryBook = () => {
  const dispatch = useDispatch();
  //search
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 800);
  // console.log(searchDebounce);

  //Add ///////////////
  const [openAddForm, setOpenAddForm] = useState(false);

  //Edit ///////////////
  const [openEditForm, setOpenEditForm] = useState(false);

  //set refresh department tai vi tri sau khi them va sua
  const [reloadPage, setReloadPage] = useState(false);

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

  const fetchcateBooks = async (page, item_per_page, search) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetCategoryBook({
        page,
        item_per_page,
        search,
      });
      dispatch(setCateBooks(response.data.data));
      dispatch(setTotalCate(response.data.total));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("get all user", error);
    }
  };

  useEffect(() => {
    fetchcateBooks(page, itemPerPage, search);
  }, [page, itemPerPage, searchDebounce, reloadPage]);

  // console.log("deparment render", reloadPage);
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
            <SearchCategory onSearch={setSearch} />
            <ListCategory
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
      <AddCategory
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setReloadPage={setReloadPage}
      />
      <EditCategory
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        setReloadPage={setReloadPage}
      />
    </>
  );
};

export default CategoryBook;
