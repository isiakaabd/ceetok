import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import { useFormikContext } from "formik/dist";
import { useAddImageMutation } from "redux/slices/postSlice";
import { TextError } from "validation/TextError";
const Editor = ({ theme, name, placeholder, value }) => {
  hljs.configure({
    languages: ["javascript", "ruby", "python", "rust"],
  });
  const modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image", "video", "code-block", "script"],
      ["script", "underline", "align"],
      [{ color: ["#37D42A", "#fff", "#f00"] }, { background: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  const { quill, quillRef } = useQuill({
    theme,
    ...formats,
    modules,
    placeholder,
  });

  const { setFieldValue, errors, values } = useFormikContext();
  const [uploadImage, { isLoading }] = useAddImageMutation();
  // const theme = 'bubble';

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const form = new FormData();
    form.append("type", "posts");
    form.append("file", file);

    const res = await uploadImage(form);
    console.log(res);
    // insertToEditor(res.uploadedImageUrl);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      console.log(input.files);
      const file = input.files[0];
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        //
        setFieldValue(name, quill.root.innerHTML);
      });
    }
    //eslint-disable-next-line
  }, [quill]);

  useEffect(() => {
    if (quill && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value, quill]);
  useEffect(() => {
    if (quill && !values[name]) {
      quill.setContents([{ insert: "\n" }]);
    }
  }, [values, quill, name]);
  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
      // quill.getModule("toolbar").addHandler("container", "#toolbar");
    }
  }, [quill]);
  return (
    <>
      <Grid
        item
        container
        sx={{ border: "2px solid #C4C4C4", borderRadius: "1.2rem" }}
        flexDirection="column"
      >
        <Grid ref={quillRef} />

        <Typography
          color="#9B9A9A"
          sx={{ p: 2, fontSize: { md: "1.3rem", sm: "1rem" } }}
        >
          Message
        </Typography>
      </Grid>
      {errors[name] && <TextError>{errors[name]}</TextError>}
    </>
  );
};

export default Editor;
