import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

import BlotFormatter from "quill-blot-formatter";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormikContext } from "formik/dist";
import { TextError } from "validation/TextError";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
Quill.register(BlotFormatter, true);
// const validation = Yup.object({
//   title: Yup.string("Enter Title").required("Required"),
//   category: Yup.string("Enter Category").required("Required"),
//   text: Yup.string("Enter Category").required("Required"),
//   // name: Yup.string("Enter Your name").required("Name is ").trim(),
// });

hljs.registerLanguage("javascript", javascript);
const Editor = ({ theme, name, placeholder, type, value, upload_id }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ align: [] }, { indent: "-1" }, { indent: "+1" }],

      [
        "blockquote",
        { list: "ordered" },
        { list: "bullet" },
        // { header: [1, 2, 3, 4, 5, 6, false] },
      ],
      ["code-block"],
      [{ direction: "rtl" }],

      ["align", "strike", { script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
      [{ color: ["#37D42A", "#fff", "#f00"] }, { background: [] }],
      [{ font: [] }]["clean"],
      // ["tweet"],
    ],
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },

    // link: true,
  };

  const { quill, quillRef } = useQuill({
    theme,
    // formats
    formats: [
      "bold",
      "italic",
      "blockquote",
      "code-block",
      "font",
      "tweet",
      "underline",
      "background",
      "color",
      "script",
      "strike",
      "sub",
      "align",
      "header",
      "strike",
      "super",
      "label",
    ],
    modules,
    placeholder,
  });
  const token = useSelector((state) => state.auth.token);
  const { setFieldValue, errors, values } = useFormikContext();

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const form = new FormData();
    form.append("type", type);
    form.append("media", file);

    // const res = await uploadImage(form);
    // process.env.REACT_APP_UPLOAD;
    fetch(process.env.REACT_APP_UPLOAD, {
      method: "POST",
      body: form,
      headers: {
        // 👇 Set headers manually for single file upload
        AUTHORIZATION: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setFieldValue(upload_id, data.body.post_id);
      })
      .catch((err) => toast.error(err));

    // insertToEditor(res.uploadedImageUrl);
  };
  const addLink = () => {
    const url = window.prompt("Enter the URL");
    // const text = quill.getSelection(true).text;
    quill.format("link", url, "user");
    quill.formatText(quill.getSelection(), { link: url }, "user");
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", true);
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
    if (quill && values[name] === "") {
      quill.setContents([{ insert: "\n" }]);
      // setFieldError(name, "required");
    }
  }, [values, name, quill]);
  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
      quill.getModule("toolbar").addHandler("link", addLink);
    }

    //eslint-disable-next-line
  }, [quill]);
  // quill.getModule("toolbar").addHandler("tweet", () => console.log(!24));

  return (
    <>
      <div
        item
        container
        style={{
          border: ".5px solid #C4C4C4",
          maxHeight: "12rem",
          borderRadius: "1.2rem",
          overflowY: "scroll",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: ".85rem",
            display: "none",
          },
          scrollbarColor: "transparent",
        }}
        flexDirection="column"
      >
        <div ref={quillRef} style={{ position: "relative" }} />

        {/* <Typography
          color="#9B9A9A"
          component="div"
          sx={{ p: 1, fontSize: { md: "1.3rem", sm: "1rem" } }}
        >
          Message
        </Typography> */}
      </div>
      {errors[name] && <TextError>{errors[name]}</TextError>}
    </>
  );
};

export default Editor;
