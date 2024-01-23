import { TableRow, TableCell, Skeleton, TableBody } from "@mui/material";

const TableLoader = ({ rowsNum, colsNum }) => {
  return (
    <TableBody>
      {[...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          {[...Array(colsNum)].map((col, idx) => (
            <TableCell key={idx}>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoader;
