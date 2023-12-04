import CardLoader from "@/components/common/CardLoader";
import { Scrollbar } from "@/components/common/Scrollbar";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BookCard } from "./book-card";

const GridBook = ({ books, total, page, onPageChange }) => {
  const { isLoading } = useSelector((state) => state.app);

  return (
    <Scrollbar style={{ marginTop: "50px" }}>
      {isLoading ? (
        <CardLoader items={8} />
      ) : (
        <>
          {books?.length <= 0 ? (
            <Typography>Không có dữ liệu</Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {books.map((book) => (
                  <Grid item key={book.id} xs={12} md={4} xl={3}>
                    <BookCard book={book} />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{ display: "flex", justifyContent: "center", padding: 3 }}
              >
                <Pagination
                  count={total}
                  page={page}
                  onChange={onPageChange}
                  showFirstButton
                  showLastButton
                  size="large"
                />
              </Box>
            </>
          )}
        </>
      )}
    </Scrollbar>
  );
};

export default GridBook;
