import { Box, Typography, FormHelperText, Stack, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  const { form, name, caption, photo } = props;
  const { setValue } = form;
  const [files, setFiles] = useState([]);
  const [error, setError] = useState();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
      {/* <Typography fontWeight="bold" variant="body1">
        Chọn ảnh{" "}
      </Typography> */}
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar
            sx={{
              height: 64,
              width: 64,
            }}
          >
            <CloudUploadIcon />
          </Avatar>
          <Stack spacing={1}>
            <Typography
              sx={{
                "& span": {
                  textDecoration: "underline",
                },
              }}
              variant="h6"
            >
              <span>Click to upload</span> or drag and drop
            </Typography>
            {caption && (
              <Typography color="text.secondary" variant="body2">
                {caption}
              </Typography>
            )}
          </Stack>
        </Stack>
        <FormHelperText sx={{ color: "red" }}>{error && error}</FormHelperText>
      </Box>
      <aside style={thumbsContainer}>{thumbs}</aside>
      {photo && files.length <= 0 && (
        <aside style={thumbsContainer}>
          <div style={thumb}>
            <div style={thumbInner}>
              <img
                src={`${import.meta.env.VITE_BACK_END_URL}/storage/${photo}`}
                style={img}
                // Revoke data uri after image is loaded
                // onLoad={() => {
                //   URL.revokeObjectURL(file.preview);
                // }}
              />
            </div>
          </div>
        </aside>
      )}
    </Box>
  );
}
