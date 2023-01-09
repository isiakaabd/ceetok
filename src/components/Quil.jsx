import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Grid, Typography } from "@mui/material";
Quill.register("modules/imageResize", ImageResize);

/*
 * Simple editor component that takes placeholder text as a prop
 */

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const Editor = ({ theme, placeholder, value, handleChange }) => {
  return (
    <Grid
      item
      container
      sx={{ border: "2px solid #C4C4C4", borderRadius: "1.2rem" }}
      flexDirection="column"
    >
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={value}
        modules={modules}
        formats={formats}
        bounds={"#root"}
        placeholder={placeholder}
      />
      <Typography
        color="#9B9A9A"
        sx={{ p: 2, fontSize: { md: "1.3rem", sm: "1rem" } }}
      >
        Message
      </Typography>
    </Grid>
  );
};

export default Editor;
