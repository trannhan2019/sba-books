import { Box, Card, ImageList, ImageListItem, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageInput = (props) => {
  const { name, mode = "update", form } = props;

  const { register, unregister, setValue, watch } = form;

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      let newFiles =
        mode === "update" ? droppedFiles : [...(files || []), ...droppedFiles];
      if (mode === "append") {
        newFiles = newFiles.reduce((prev, file) => {
          const fo = Object.entries(file);
          if (
            prev.find((e) => {
              const eo = Object.entries(e);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1]
              );
            })
          ) {
            return prev;
          } else {
            return [...prev, file];
          }
        }, []);
      }
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <Box>
      <Typography>Chọn hình ảnh</Typography>

      <Card sx={{ mt: 2 }} {...getRootProps()}>
        <input
          {...props}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          {...getInputProps()}
        />

        <div
          className={
            "w-full p-2 border border-dashed border-gray-900 " +
            (isDragActive ? "bg-gray-400" : "bg-gray-200")
          }
        >
          <Typography variant="body1" sx={{ textAlign: "center", py: 2 }}>
            Drop the files here ...
          </Typography>
          {!!files?.length && (
            <ImageList>
              {files.map((file) => {
                return (
                  <ImageListItem key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </div>
      </Card>
    </Box>
  );
};

export default ImageInput;
