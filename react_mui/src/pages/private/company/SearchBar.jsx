import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const SearchBar = ({ onSearchName }) => {
  return (
    <Card
      sx={{
        p: 2,
      }}
    >
      <OutlinedInput
        onChange={(e) => onSearchName(e.target.value)}
        defaultValue=""
        fullWidth
        placeholder="Tìm kiếm theo tên Công ty ..."
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 450 }}
      />
    </Card>
  );
};
