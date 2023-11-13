import { Box, Typography, FormHelperText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  position: "relative",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function ImageInput2(props) {
  const { form, name } = props;
  const { setValue } = form;
  const [files, setFiles] = useState([]);
  const [error, setError] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 5242880, //5MB
    onDrop: (acceptedFiles, rejected) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setValue(name, acceptedFiles);
      if (rejected) {
        setError(rejected[0]?.errors[0].message);
      } else {
        setError(null);
      }
    },
  });

  const removeImage = () => {
    setFiles([]);
    setValue(name, []);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <IconButton
          onClick={() => removeImage()}
          aria-label="delete"
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            opacity: 0.3,
            ":hover": { color: "red", opacity: 0.7 },
          }}
        >
          <DeleteIcon />
        </IconButton>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return (
    <Box mt={1}>
      <Typography fontWeight="bold" variant="body1">
        Chọn ảnh{" "}
      </Typography>
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography
          sx={{ fontStyle: "italic", padding: 1, border: "1px dashed #cccc" }}
        >
          Drag 'n' drop some files here, or click to select files
        </Typography>
        <FormHelperText sx={{ color: "red" }}>{error && error}</FormHelperText>
      </Box>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Box>
  );
}
