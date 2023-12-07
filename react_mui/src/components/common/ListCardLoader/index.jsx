import { Card, CardContent, CardMedia, Grid, Skeleton } from "@mui/material";

const ListCardLoader = ({ items }) => {
  return (
    <Grid container spacing={3}>
      {[...Array(items)].map((item, idx) => (
        <Grid item key={idx} xs={12} md={4} xl={3}>
          <Card>
            <CardMedia>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height="300px"
                animation="wave"
              />
            </CardMedia>
            <CardContent>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListCardLoader;
