import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { useState } from "react";

const ManageBookHistorySearch = ({ onSearch, handlePageReset }) => {
  const [valueSearch, setValueSearch] = useState("");

  const submitChangeSearch = (event) => {
    event.preventDefault();
    onSearch(valueSearch);
    handlePageReset();
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <form onSubmit={(event) => submitChangeSearch(event)}>
          <Stack direction="row" spacing={2}>
            <OutlinedInput
              onChange={(e) => setValueSearch(e.target.value)}
              defaultValue=""
              size="small"
              sx={{ width: "300px" }}
              placeholder="Tìm kiếm theo tên người mượn sách..."
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </InputAdornment>
              }
            />
            <Button variant="outlined" size="small" type="submit">
              Search
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default ManageBookHistorySearch;
