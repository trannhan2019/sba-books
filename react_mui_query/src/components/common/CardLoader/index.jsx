import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";

const CardLoader = () => {
  return (
    <>
      <Card>
        <Grid container>
          <Grid
            item
            xs={12}
            md={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Skeleton
              component="div"
              variant="rectangular"
              width={350}
              height={350}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <CardContent>
              <Stack spacing={1}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="rectangular" width={"100%"} height={70} />
              </Stack>
            </CardContent>
            <CardActions sx={{ padding: 3 }}>
              <Skeleton variant="rectangular" width={210} height={60} />
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CardLoader;
