import { Link, useNavigate, useParams } from "react-router-dom";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useQuery } from "@tanstack/react-query";
import { apiGetBook } from "@/apis/book";
import BookImageDefault from "@/assets/default-image-book.jpg";
import { getUrlImage } from "@/utils/get-url-image";
import CardLoader from "@/components/common/CardLoader";
import { Parser } from "html-to-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { apiStoreBookHistory } from "@/apis/book-history";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/app/appSlice";

const BookDetail = () => {
  let { id } = useParams();
  const { isLoading } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [book, setBook] = useState(null);

  // const { data: book, isFetching } = useQuery({
  //   queryKey: ["book", id],
  //   queryFn: async () => {
  //     const res = await apiGetBook(id);
  //     return res.data;
  //   },
  //   placeholderData: [],
  // });
  const fetchData = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await apiGetBook(id);
      setBook(response.data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const handleSubscribe = () => {
    Swal.fire({
      icon: "info",
      title: "Xác nhận mượn sách này ?",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiStoreBookHistory({ exchange_user_id: user.id, book_id: id });
          Swal.fire("Saved!", "", "success");
          navigate("/book-history");
        } catch (error) {
          console.log("delete", error);
          toast.error("Lỗi không mượn được sách");
        }
      }
    });
  };

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
          <Stack direction="row" mb={4} justifyContent="space-between">
            <Typography variant="h3">Thông tin chi tiết</Typography>
            <Link to="/">
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                Trở lại
              </Button>
            </Link>
          </Stack>
          {isLoading ? (
            <CardLoader />
          ) : (
            <Card>
              <Grid container>
                <Grid item xs={12} md={5}>
                  <CardMedia
                    image={
                      book?.photo_url &&
                      book?.photo_url !== "0" &&
                      book?.photo_url !== "null"
                        ? book?.photo_url
                        : getUrlImage(book?.photo)
                    }
                    component="img"
                    sx={{
                      height: 500,
                      // backgroundSize: "85% 85%",
                    }}
                  />
                  {/* <Box
                    sx={{
                      height: 500,
                      backgroundSize: "85% 85%",
                      backgroundImage: `url(${bookPhoto})`,
                    }}
                  /> */}
                  {/* {book?.photo_url ? (
                    <CardMedia
                      image={book?.photo_url}
                      component="img"
                      sx={{
                        height: 500,
                        // backgroundSize: "85% 85%",
                      }}
                    />
                  ) : (
                    <CardMedia
                      image={getUrlImage(book?.photo)}
                      component="img"
                      sx={{
                        height: 500,
                      }}
                    />
                  )} */}
                </Grid>

                <Grid item xs={12} md={7}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography mb={2} variant="h3">
                        {book?.title}
                      </Typography>

                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          Thuộc thể loại:
                        </Typography>
                        <Chip
                          color="info"
                          size="small"
                          label={book?.cate_book?.name}
                        />
                      </Stack>
                      <Typography variant="subtitle2">
                        Tác giả: {book?.author}
                      </Typography>

                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">Số lượng:</Typography>
                        {book?.quantity > 0 ? (
                          <Chip size="small" label={book?.quantity} />
                        ) : (
                          <Chip
                            size="small"
                            color="error"
                            label="Đã mượn hết"
                          />
                        )}
                      </Stack>

                      <Typography variant="subtitle2">
                        Mã sách: {book?.code}
                      </Typography>

                      <Typography variant="subtitle2">
                        Thông tin lưu trữ: {book?.storage_location}
                      </Typography>

                      <Typography variant="subtitle2">
                        {Parser().parse(book?.description)}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ padding: 3 }}>
                    {book?.quantity > 0 ? (
                      <Button
                        onClick={handleSubscribe}
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Mượn sách
                      </Button>
                    ) : (
                      <Button
                        disabled
                        color="error"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Sách đã mượn hết
                      </Button>
                    )}
                    {/* disable khi so luong = 0 */}
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          )}
        </Container>
      </Box>
    </>
  );
};

export default BookDetail;
