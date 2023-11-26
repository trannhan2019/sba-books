import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const EditorTiny = ({ form, name, label = name }) => {
  const { control } = form;
  const editorRef = useRef(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth margin="normal">
          <InputLabel>{label}</InputLabel>
          <Editor
            value={value}
            apiKey={
              import.meta.env.VITE_REACT_APP_TINY_API_KWY ||
              "rhb5n8q202crgevakp4n5yp5vcfdh9coo5fdpfivswde4f61"
            }
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
          <FormHelperText sx={{ color: "red" }}>
            {error && error.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default EditorTiny;
