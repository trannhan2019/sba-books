import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import CateBookIconly from "@/assets/iconly/iconly-glass-chart.svg";
import BookIconly from "@/assets/iconly/iconly-glass-paper.svg";
import BookHistoryIconly from "@/assets/iconly/activity.svg";
import { OverviewCard } from "./overview-card";
import { apiGetOverView } from "@/apis/overview";
import { OverviewTopBook } from "./overview-top-book";
import { OverviewTopUser } from "./overview-top-user";
import { useQuery } from "@tanstack/react-query";

const ManageOverview = () => {
  const { data: overviewData } = useQuery({
    queryKey: ["overview-list"],
    queryFn: () => {
      return apiGetOverView();
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth={"xl"}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Tổng quan</Typography>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewCard
                amount={overviewData?.data.cateBookCount || 0}
                image={CateBookIconly}
                heading="Số lượng danh mục sách"
                link="manage-category-book"
              />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewCard
                amount={overviewData?.data.bookCount || 0}
                image={BookIconly}
                heading="Số lượng sách"
                link="manage-book"
              />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewCard
                amount={overviewData?.data.bookHistoryCount || 0}
                image={BookHistoryIconly}
                heading="Số lần mượn trả sách"
                link="manage-book-history"
              />
            </Grid>

            <Grid xs={6}>
              <OverviewTopBook
                books={overviewData?.data.bookTopTransaction || []}
              />
            </Grid>
            <Grid xs={6}>
              <OverviewTopUser
                users={overviewData?.data.userTopTransaction || []}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageOverview;
