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
import { useEffect, useState } from "react";
import { apiGetOverView } from "@/apis/overview";
import { OverviewTopBook } from "./overview-top-book";
import { OverviewTopUser } from "./overview-top-user";

const ManageOverview = () => {
  const [cateBookCount, setCateBookCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [bookHistoryCount, setBookHistoryCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const res = await apiGetOverView();
    console.log(res.data);
    setCateBookCount(res.data.cateBookCount);
    setBookCount(res.data.bookCount);
    setBookHistoryCount(res.data.bookHistoryCount);
    setBooks(res.data.bookTopTransaction);
    setUsers(res.data.userTopTransaction);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                amount={cateBookCount}
                image={CateBookIconly}
                heading="Số lượng danh mục sách"
                link="manage-category-book"
              />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewCard
                amount={bookCount}
                image={BookIconly}
                heading="Số lượng sách"
                link="manage-book"
              />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewCard
                amount={bookHistoryCount}
                image={BookHistoryIconly}
                heading="Số lần mượn trả sách"
                link="manage-book-history"
              />
            </Grid>

            <Grid xs={6}>
              <OverviewTopBook books={books} />
            </Grid>
            <Grid xs={6}>
              <OverviewTopUser users={users} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageOverview;
