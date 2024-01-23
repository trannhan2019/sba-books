import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from "@mui/material";
import { useState } from "react";

const SearchCategory = ({ onSearch, handlePageReset }) => {
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
        gap: 5,
      }}
    >
      <form onSubmit={(event) => submitChangeSearch(event)}>
        <Stack direction="row" spacing={2}>
          <OutlinedInput
            onChange={(event) => setValueSearch(event.target.value)}
            defaultValue=""
            fullWidth
            size="small"
            placeholder="Tìm kiếm theo tên danh mục ..."
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 450 }}
          />
          <Button variant="outlined" size="small" type="submit">
            Search
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default SearchCategory;
