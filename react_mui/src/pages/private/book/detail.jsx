import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiGetBook } from "@/apis/book";
import BookImageDefault from "@/assets/default-image-book.jpg";
import { getUrlImage } from "@/utils/get-url-image";

const BookDetail = () => {
  let { id } = useParams();

  const { data: book } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await apiGetBook(id);
      return res.data;
    },
    placeholderData: [],
  });

  // console.log(data);
  let bookPhoto = book?.photo ? getUrlImage(book.photo) : BookImageDefault;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3">Thông tin chi tiết</Typography>
          <Card>
            <Grid container mt={3}>
              <Grid item xs={12} md={5}>
                <CardMedia
                  sx={{
                    backgroundImage: `url(${bookPhoto})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: 1,
                    height: 500,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <CardContent>
                  <Stack spacing={3}>
                    <Typography variant="h3">{book?.title}</Typography>
                    <div>
                      <Chip label={book?.cate_book?.name} />
                    </div>
                    <Typography color="text.secondary" variant="subtitle1">
                      {book?.description}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                      sx={{ mt: 3 }}
                    >
                      {/* <Avatar src={post.author.avatar} />
                <div>
                  <Typography variant="subtitle2">
                    By {post.author.name} • {publishedAt}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {post.readTime} read
                  </Typography>
                </div> */}
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">Muon</Button>
                  {/* disable khi so luong = 0 */}
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default BookDetail;
