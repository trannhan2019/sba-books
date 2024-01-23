import { useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from "@mui/material";

const SearchDepartment = ({ onSearch, handlePageReset }) => {
  const [valueSearch, setValueSearch] = useState("");

  const submitChangeSearch = (event) => {
    event.preventDefault();
    onSearch(valueSearch);
    handlePageReset();
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <form onSubmit={(event) => submitChangeSearch(event)}>
        <Stack direction="row" spacing={2}>
          <OutlinedInput
            onChange={(e) => setValueSearch(e.target.value)}
            defaultValue=""
            fullWidth
            placeholder="Tìm kiếm theo tên Phòng ban hoặc tên viết tắt ..."
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 550 }}
          />
          <Button variant="outlined" size="small" type="submit">
            Search
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default SearchDepartment;
