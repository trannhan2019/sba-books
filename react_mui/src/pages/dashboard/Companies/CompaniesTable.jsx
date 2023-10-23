import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "@/components/Scrollbar";
import { getInitials } from "@/utils/get-initials";

export const CompaniesTable = (props) => {
  const {
    count = 0,
    items = [],
    // onDeselectAll,
    // onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    // onSelectAll,
    // onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  // const selectedSome = selected.length > 0 && selected.length < items.length;
  // const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                  // checked={selectedAll}
                  // indeterminate={selectedSome}
                  // onChange={(event) => {
                  //   if (event.target.checked) {
                  //     onSelectAll?.();
                  //   } else {
                  //     onDeselectAll?.();
                  //   }
                  // }}
                  />
                </TableCell>
                <TableCell>Tên Công ty</TableCell>
                <TableCell>Tên viết tắt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((company) => {
                // const isSelected = selected.includes(customer.id);
                // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow
                    hover
                    key={company.id}
                    // selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                      // checked={isSelected}
                      // onChange={(event) => {
                      //   if (event.target.checked) {
                      //     onSelectOne?.(customer.id);
                      //   } else {
                      //     onDeselectOne?.(customer.id);
                      //   }
                      // }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={company.avatar}>
                          {getInitials(company.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {company.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{company.alias}</TableCell>
                    {/* <TableCell>
                      {customer.address.city}, {customer.address.state},{" "}
                      {customer.address.country}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{createdAt}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        showFirstButton
        showLastButton
      />
    </Card>
  );
};
