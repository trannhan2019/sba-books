import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { apiGetCurrentUser, apiUpdatePhotoUser } from "@/apis/user";
import { getUrlImage } from "@/utils/get-url-image";
import { setUser } from "@/store/auth/authSlice";

const AccountPhoto = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { setValue, handleSubmit } = useForm();
  const [error, setError] = useState();

  const [photo, setPhoto] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 2 * 1024 * 1204,
    onDrop: (acceptedFiles, rejected) => {
      //   console.log(acceptedFiles);
      //   console.log(rejected);

      if (rejected.length > 0) {
        setError(rejected[0]?.errors[0].message);
        setPhoto(null);
      } else {
        setValue("photo", acceptedFiles[0]);
        setPhoto(URL.createObjectURL(acceptedFiles[0]));
        setError(null);
      }
    },
    multiple: false,
  });

  // console.log(photo);
  // useEffect(async () => {
  //   const res = await apiGetCurrentUser(user.id);
  //   dispatch(setUser(res.data.data));
  // }, []);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(photo);
  }, []);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      let formData = new FormData();
      formData.append("photo", values.photo);
      // console.log(formData.get("title"));
      await apiUpdatePhotoUser(user.id, formData);
      const res = await apiGetCurrentUser(user.id);
      dispatch(setUser(res.data));
      toast.success("Thay đổi ảnh thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi không sửa được thông tin");
    }
  };

  return (
    <Grid xs={12} md={4}>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Box
          sx={{
            borderColor: "neutral.300",
            borderRadius: "50%",
            borderStyle: "dashed",
            borderWidth: 1,
            p: "4px",
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <Box
              {...getRootProps()}
              sx={{
                alignItems: "center",
                backgroundColor: (theme) =>
                  alpha(theme.palette.neutral[700], 0.5),
                borderRadius: "50%",
                color: "common.white",
                cursor: "pointer",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                left: 0,
                opacity: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: 1,
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <input {...getInputProps()} />
              <Stack alignItems="center" direction="row" spacing={1}>
                <CameraAltOutlinedIcon />
                <Typography
                  color="inherit"
                  variant="subtitle2"
                  sx={{ fontWeight: 700 }}
                >
                  Select
                </Typography>
              </Stack>
            </Box>
            <Avatar
              src={photo || getUrlImage(user.photo)}
              sx={{
                height: 120,
                width: 120,
              }}
            >
              <PersonOutlineOutlinedIcon />
            </Avatar>
          </Box>
        </Box>
        <Stack>
          <Button
            color="inherit"
            size="small"
            onClick={handleSubmit(onSubmit)}
            disabled={!photo}
          >
            Change
          </Button>
          <FormHelperText sx={{ color: "red" }}>
            {error && error}
          </FormHelperText>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default AccountPhoto;
