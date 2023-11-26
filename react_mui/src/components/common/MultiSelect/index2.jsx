import React, { useState } from "react";

import _without from "lodash/without";
import {
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { styled } from "@mui/material/styles";

// const useStyles = styled((theme) =>
//   createStyles({
//     redBackground: {
//       backgroundColor: "#C00",
//       padding: 10,
//     },
//     whiteBackground: {
//       backgroundColor: "#FFF",
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//       maxWidth: 300,
//     },
//     chips: {
//       display: "flex",
//       flexWrap: "wrap",
//     },
//     chip: {
//       margin: 2,
//       backgroundColor: "#FFF",
//     },
//     noLabel: {
//       marginTop: theme.spacing(3),
//     },
//   })
// );

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const initialSelected = ["April Tucker", "Ralph Hubbard"];

const MultipleSelectDemo = () => {
  // const classes = useStyles();
  const [personName, setPersonName] = useState(initialSelected);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("clicked delete");
    setPersonName((current) => _without(current, value));
  };

  return (
    <div>
      <p>
        clicking the 'x' just opens the select instead of deselecting the item
      </p>
      <div>
        <FormControl>
          <InputLabel id="demo-mutiple-chip-checkbox-label">
            Chip + Check
          </InputLabel>
          <Select
            labelId="demo-mutiple-chip-checkbox-label"
            id="demo-mutiple-chip-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            onOpen={() => console.log("select opened")}
            //input={<Input />}
            // MenuProps={MenuProps}
            // IconComponent={KeyboardArrowDownIcon}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <CloseIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => handleDelete(e, value)}
                    onClick={() => console.log("clicked chip")}
                  />
                ))}
              </div>
            )}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <p>
        When the chips are show <b>OUTSIDE</b> of the input, there is no problem
        deleting them
      </p>
      <div>
        {personName.map((value) => (
          <Chip
            key={value}
            label={value}
            clickable
            onDelete={(e) => handleDelete(e, value)}
            onClick={() => console.log("clicked chip")}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleSelectDemo;
