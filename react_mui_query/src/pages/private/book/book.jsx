import { useState } from "react";
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
import ListBook from "./list";
import SearchBook from "./search";
import GridBook from "./grid";
import { useQuery } from "@tanstack/react-query";
import { usePaginateMui } from "@/hooks/usePaginateMui";

const Book = () => {
  //search
  const [search, setSearch] = useState("");

  //cac state
  //   const [cateBooks, setCateBooks] = useState([]);
  const [cateSelected, setCateSelected] = useState([]);
  const [isGrid, setIsGrid] = useState(true);

  //paginate
  const {
    page,
    pageMui,
    handlePageChange,
    handlePageReset,
    itemPerPage,
    handleRowsPerPageChange,
    handlePageChangeGrid,
  } = usePaginateMui(8);

  const { isLoading, data: booksData } = useQuery({
    queryKey: ["book-list", page, itemPerPage, search, cateSelected],
    queryFn: () => {
      return apiGetListBook({ page, itemPerPage, search, cateSelected });
    },
  });

  const { data: cateBooks } = useQuery({
    queryKey: ["cate-book-all"],
    queryFn: async () => {
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
              cateBooks={cateBooks?.data || []}
              setCateSelected={setCateSelected}
              handlePageReset={handlePageReset}
            />
            {isGrid ? (
              <GridBook
                books={booksData?.data.data || []}
                total={Math.ceil(booksData?.data.total / itemPerPage)}
                page={page}
                onPageChange={handlePageChangeGrid}
                isLoading={isLoading}
              />
            ) : (
              // <></>
              <ListBook
                books={booksData?.data.data || []}
                total={booksData?.data.total || 0}
                page={pageMui}
                rowsPerPage={itemPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Book;
