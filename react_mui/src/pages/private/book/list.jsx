import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import HideImageIcon from "@mui/icons-material/HideImage";
import { Scrollbar } from "@/components/common/Scrollbar";
import TableLoader from "@/components/common/TableLoader";
import { useSelector } from "react-redux";
import { getUrlImage } from "@/utils/get-url-image";

const useSelectionModel = (books) => {
  const bookIds = useMemo(() => {
    return books.map((book) => book.id);
  }, [books]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [bookIds]);

  const selectOne = useCallback((bookId) => {
    setSelected((prevState) => [...prevState, bookId]);
  }, []);

  const deselectOne = useCallback((bookId) => {
    setSelected((prevState) => {
      return prevState.filter((id) => id !== bookId);
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected([...bookIds]);
  }, [bookIds]);

  const deselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  return {
    deselectAll,
    deselectOne,
    selectAll,
    selectOne,
    selected,
  };
};

const ListBook = (props) => {
  const {
    books,
    count,
    page,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPage,
    ...other
  } = props;

  const { isLoading } = useSelector((state) => state.app);

  //open action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //selected
  const { deselectAll, selectAll, deselectOne, selectOne, selected } =
    useSelectionModel(books);

  const handleToggleAll = useCallback(
    (event) => {
      const { checked } = event.target;

      if (checked) {
        selectAll();
      } else {
        deselectAll();
      }
    },
    [selectAll, deselectAll]
  );

  const selectedAll = selected.length === books.length;
  const selectedSome = selected.length > 0 && selected.length < books.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: "relative" }}>
      {enableBulkActions > 0 && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "neutral.800" : "neutral.50",
            display: enableBulkActions ? "flex" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={handleToggleAll}
          />
          <Button
            // onClick={() => handleDeleteAllDepartment()}
            size="small"
            startIcon={<DeleteOutlinedIcon />}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleToggleAll}
                />
              </TableCell>
              <TableCell>Tiều đề</TableCell>
              <TableCell>Thuộc thể loại</TableCell>
              <TableCell>Tác giả</TableCell>
              <TableCell>Tình trạng / Số lượng</TableCell>
              <TableCell>Mã sách</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableLoader rowsNum={8} colsNum={5} />
          ) : (
            <TableBody>
              {books?.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body1">
                      Không tìm thấy dữ liệu ...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                books?.map((book) => {
                  const isSelected = selected.includes(book.id);

                  return (
                    <TableRow hover key={book.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            const { checked } = event.target;

                            if (checked) {
                              selectOne(book.id);
                            } else {
                              deselectOne(book.id);
                            }
                          }}
                          value={isSelected}
                        />
                      </TableCell>

                      <TableCell width="25%">
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          {book.photo ? (
                            <Box
                              sx={{
                                alignItems: "center",
                                backgroundColor: "neutral.50",
                                backgroundImage: `url(${getUrlImage(
                                  book.photo
                                )})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                borderRadius: 1,
                                display: "flex",
                                height: 80,
                                justifyContent: "center",
                                overflow: "hidden",
                                width: 80,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                alignItems: "center",
                                backgroundColor: "neutral.50",
                                borderRadius: 1,
                                display: "flex",
                                height: 80,
                                justifyContent: "center",
                                width: 80,
                              }}
                            >
                              <HideImageIcon />
                            </Box>
                          )}
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "12rem",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                cursor: "pointer",
                                ml: 1,
                              }}
                            >
                              {book.title}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>

                      <TableCell width="15%">
                        <Typography variant="body2">
                          {book.cate_book.name}
                        </Typography>
                      </TableCell>

                      <TableCell width="15%">
                        <Typography variant="body2">{book.author}</Typography>
                      </TableCell>

                      <TableCell width="10%">
                        {book.quantity > 0 ? (
                          <Stack>
                            <Chip
                              label="Còn trên kệ"
                              color="success"
                              size="small"
                            />
                            <Typography variant="body2" textAlign="center">
                              {book.quantity} cuốn
                            </Typography>
                          </Stack>
                        ) : (
                          <Chip
                            label="Đã mượn hết"
                            color="error"
                            size="small"
                          />
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">{book.code}</Typography>
                      </TableCell>

                      <TableCell>
                        <IconButton onClick={handleClick}>
                          <MoreHorizOutlinedIcon />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuList>
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <EditNoteOutlinedIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <DeleteOutlinedIcon
                                  fontSize="small"
                                  color="error"
                                />
                              </ListItemIcon>
                              <ListItemText>Delete</ListItemText>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          )}
        </Table>
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
    </Box>
  );
};

export default ListBook;
