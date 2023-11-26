import { useCallback, useMemo, useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Chip, Divider, Input, Stack, Typography } from "@mui/material";
import { MultiSelect } from "@/components/common/MultiSelect";
import { useUpdateEffect } from "@/hooks/use-update-effect";

// const categoryOptions = [
//   {
//     label: "Healthcare",
//     value: "healthcare",
//   },
//   {
//     label: "Makeup",
//     value: "makeup",
//   },
//   {
//     label: "Dress",
//     value: "dress",
//   },
//   {
//     label: "Skincare",
//     value: "skincare",
//   },
//   {
//     label: "Jewelry",
//     value: "jewelry",
//   },
//   {
//     label: "Blouse",
//     value: "blouse",
//   },
// ];

export const BookSearch = (props) => {
  const { onFiltersChange, cateBooks, ...other } = props;
  const queryRef = useRef(null);
  const [query, setQuery] = useState("");
  const [chips, setChips] = useState([]);

  const handleChipsUpdate = useCallback(() => {
    const filters = {
      name: undefined,
      category: [],
    };

    chips.forEach((chip) => {
      switch (chip.field) {
        case "name":
          // There will (or should) be only one chips with field "name"
          // so we can set up it directly
          filters.name = chip.value;
          break;
        case "category":
          filters.category.push(chip.value);
          break;
        default:
          break;
      }
    });

    onFiltersChange?.(filters);
  }, [chips, onFiltersChange]);

  useUpdateEffect(() => {
    handleChipsUpdate();
  }, [chips, handleChipsUpdate]);

  const handleChipDelete = useCallback((deletedChip) => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => {
        // There can exist multiple chips for the same field.
        // Filter them by value.

        return !(
          deletedChip.field === chip.field && deletedChip.value === chip.value
        );
      });
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setQuery(queryRef.current?.value || "");
  }, []);

  const handleCategoryChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== "category") {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = cateBooks.find((option) => option.id === value);

          newChips.push({
            label: "Category",
            field: "category",
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  // We memoize this part to prevent re-render issues
  const categoryValues = useMemo(
    () =>
      chips
        .filter((chip) => chip.field === "category")
        .map((chip) => chip.value),
    [chips]
  );

  const showChips = chips.length > 0;

  return (
    <div {...other}>
      <Stack
        alignItems="center"
        component="form"
        direction="row"
        onSubmit={handleQueryChange}
        spacing={2}
        sx={{ p: 2 }}
      >
        <SearchOutlinedIcon />
        <Input
          disableUnderline
          fullWidth
          inputProps={{ ref: queryRef }}
          placeholder="Search by product name"
          sx={{ flexGrow: 1 }}
          value={query}
        />
      </Stack>
      <Divider />
      {showChips ? (
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ p: 2 }}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    "& span": {
                      fontWeight: 600,
                    },
                  }}
                >
                  <>
                    <span>{chip.label}</span>: {chip.displayValue || chip.value}
                  </>
                </Box>
              }
              onDelete={() => handleChipDelete(chip)}
              variant="outlined"
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2.5 }}>
          <Typography color="text.secondary" variant="subtitle2">
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        <MultiSelect
          label="Category"
          onChange={handleCategoryChange}
          options={cateBooks}
          value={cateBooks}
        />
      </Stack>
    </div>
  );
};
