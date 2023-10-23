import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Scrollbar } from "@/components/Scrollbar";
import { TableRowsLoader } from "./TableRowsLoader";
import { useSelection } from "@/hooks/useSelection";
import { items } from "@/layouts/DashboardLayout/config";

export const CompaniesTable = (props) => {
  const {
    onLoading,
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
    // selected = [],
  } = props;

  const useCompaniesIds = (companies) => companies.map((company) => company.id);

  const companiesIds = useCompaniesIds(items);
  const companiesSelection = useSelection(companiesIds);

  const selectedSome =
    companiesSelection.selected.length > 0 &&
    companiesSelection.selected.length < items.length;
  const selectedAll =
    items.length > 0 && companiesSelection.selected.length === items.length;

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
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            {onLoading ? (
              <TableRowsLoader rowsNum={5} />
            ) : (
              <TableBody>
                {items.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography variant="body1">
                        Không tìm thấy dữ liệu ...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((company) => {
                    const isSelected = companiesSelection.selected.includes(
                      company.id
                    );
                    // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                    return (
                      <TableRow hover key={company.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                companiesSelection.handleSelectOne?.(
                                  company.id
                                );
                              } else {
                                companiesSelection.handleDeselectOne?.(
                                  company.id
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {company.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{company.alias}</TableCell>
                        <TableCell>
                          {company.isActive ? (
                            <Chip
                              label="Hoạt động"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="Tạm dừng"
                              color="warning"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" gap={1}>
                            <IconButton>
                              <EditNoteOutlinedIcon color="indigo" />
                            </IconButton>
                            <IconButton>
                              <DeleteOutlinedIcon color="error" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            )}
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
