import {
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "@/components/common/Scrollbar";

export const OverviewTopBook = (props) => {
  const { books } = props;

  return (
    <Card>
      <CardHeader
        title="Top 05 sách được mượn nhiều nhất"
        subheader="Tính trên số lần mượn trả sách"
        sx={{ pb: 0 }}
      />
      <Divider />
      <Scrollbar>
        <Table>
          <TableBody>
            {books.map((book) => {
              return (
                <TableRow
                  key={book?.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">{book?.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip color="primary" label={book.count_transaction} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};
