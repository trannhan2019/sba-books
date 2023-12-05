import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { getUrlImage } from "@/utils/get-url-image";
import BookImageDefault from "@/assets/default-image-book.jpg";

export const BookCard = (props) => {
  const { book } = props;

  return (
    <Card sx={{ minHeight: 500 }}>
      <CardMedia
        component={Link}
        to={`/book/${book.id}`}
        image={book.photo ? getUrlImage(book.photo) : BookImageDefault}
        sx={{ height: 300 }}
      />
      <CardContent>
        <MuiLink
          color="text.primary"
          component={Link}
          to={`/book/${book.id}`}
          variant="h6"
          sx={{
            textDecoration: "none",
            height: 46,
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            display: "block",
          }}
        >
          {book.title}
        </MuiLink>

        <Box mt={1}>
          <Typography color="text.secondary" variant="body1" component={Box}>
            Thuộc thể loại:{" "}
            <Chip
              label={book.cate_book.name}
              size="small"
              sx={{ float: "right" }}
            />
          </Typography>
        </Box>

        <Box mt={1}>
          <Typography color="text.secondary" variant="body1" component={Box}>
            Tình trạng:{" "}
            {book.quantity <= 0 ? (
              <Chip
                label="Đã mượn hết"
                color="error"
                size="small"
                sx={{ float: "right" }}
              />
            ) : (
              <Chip
                label="Còn trên kệ"
                color="success"
                size="small"
                sx={{ float: "right" }}
              />
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
