import { Box, Grid, Pagination } from "@mui/material";
import { BookCard } from "./book-card";

const GridBook = ({ books, total, page, onPageChange }) => {
  return (
    <>
      <Grid container spacing={3} pr={4}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} md={4} lg={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
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
  );
};

export default GridBook;
