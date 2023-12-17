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

export const OverviewTopUser = (props) => {
  const { users } = props;

  return (
    <Card>
      <CardHeader
        title="Top 05 người mượn sách nhiều nhất"
        subheader="Tính trên số lần mượn trả sách"
        sx={{ pb: 0 }}
      />
      <Divider />
      <Scrollbar>
        <Table>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow
                  key={user?.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">{user?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip color="info" label={user?.count_transaction} />
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
