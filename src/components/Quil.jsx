import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import { useFormikContext } from "formik/dist";
import { useAddImageMutation } from "redux/slices/postSlice";
import { TextError } from "validation/TextError";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Editor = ({ theme, name, placeholder, value, upload_id }) => {
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
      ["code-block"],
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
  const token = useSelector((state) => state.auth.token);
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
    form.append("media", file);
    console.log(form);

    // const res = await uploadImage(form);
    fetch("https://api.ceetok.live/post/upload-media", {
      method: "POST",
      body: form,
      headers: {
        // 👇 Set headers manually for single file upload
        AUTHORIZATION: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        toast.success(data.message);
        setFieldValue(upload_id, data.body.post_id);
      })
      .catch((err) => toast.error(err));

    // insertToEditor(res.uploadedImageUrl);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = (e) => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (e) => {
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
          component="div"
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
