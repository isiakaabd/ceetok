import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import MagicUrl from "quill-magic-url";
// import BlotFormatter from "quill-blot-formatter";
// import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormikContext } from "formik/dist";
import { TextError } from "validation/TextError";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// Quill.register(BlotFormatter, true);
// const validation = Yup.object({
//   title: Yup.string("Enter Title").required("Required"),
//   category: Yup.string("Enter Category").required("Required"),
//   text: Yup.string("Enter Category").required("Required"),
//   // name: Yup.string("Enter Your name").required("Name is ").trim(),
// });

hljs.registerLanguage("javascript", javascript);
const Editor = ({
  theme,
  name,
  placeholder,
  type,
  value,
  upload_id,
  editPost,
  editPostId,
}) => {
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
    magicUrl: true,
    // link: {
    //   // Add support for social links
    //   target: "_blank",
    //   attributes: {
    //     rel: "noopener noreferrer",
    //   },
    //   custom: [
    //     {
    //       // Match Twitter links
    //       selector: /^https?:\/\/(www\.)?twitter\.com\/.+\/status\/\d+\/?$/,
    //       render: (url) => {
    //         return { ops: [{ insert: url }] };
    //       },
    //     },
    //     {
    //       // Match Facebook links
    //       selector: /^https?:\/\/(www\.)?facebook\.com\/.+\/posts\/\d+\/?$/,
    //       render: (url) => {
    //         return { ops: [{ insert: url }] };
    //       },
    //     },
    //   ],
    // },
    // {
    //   // Regex used to check URLs during typing
    //   urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(tel:[\S]+)/g,
    //   // Regex used to check URLs on paste
    //   globalRegularExpression: /(https?:\/\/|www\.|tel:)[\S]+/g,
    // },

    // link: true,
  };

  const { quill, quillRef, Quill } = useQuill({
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
      "link",
      "header",
      "strike",
      "super",
      "label",
    ],
    modules,
    placeholder,
  });
  console.log(quill);
  const token = useSelector((state) => state.auth.token);
  const { setFieldValue, errors, values } = useFormikContext();

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (files) => {
    const form = new FormData();
    form.append("type", type);
    if (editPost) {
      form.append("post_id", editPostId);
    }
    if (files.length === 1) {
      form.append("media", files[0]);
    } else {
      for (let i = 0; i < files.length; i++) {
        form.append("media", files[i]);
      }
    }

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
  const addLink = (val) => {
    const url = window.prompt("Enter the URL");
    const ww = quill.format("link", url, "user");
    console.log(url);
    const urld = quill.format("link", true);
    console.log(urld);
    const range = quill.getSelection();
    const text = quill.getText();
    console.log(range.index, text);
    quill.insertText(range.index, url, "link", true);
    // quillRef.current
    //   .getEditor()
    //   .insertEmbed(range.index, "video", url, Quill.sources.USER);
    quill.insertEmbed(10, "p", "https://quilljs.com/images/cloud.png");
    // quill.insertEmbed(range.index, "link", url);
    // quill.formatText(quill.getSelection(), "link", ww);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", true);
    input.click();

    input.onchange = (e) => {
      const file = input.files;
      saveToServer(file);
    };
  };
  const selectLocalVideo = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/mp4,video/x-m4v,video/*");
    input.setAttribute("multiple", true);
    input.click();

    input.onchange = (e) => {
      const file = input.files;
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
  if (Quill) {
    // Install with 'yarn add quill-magic-url'
    Quill.register("modules/magicUrl", MagicUrl);
  }

  useEffect(() => {
    if (quill && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value, quill]);
  useEffect(() => {
    if (quill && values[name] === "") {
      quill.setContents([{ insert: "\n" }]);
    }
  }, [values, name, quill]);
  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
      quill.getModule("toolbar").addHandler("video", selectLocalVideo);
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

          borderRadius: "1.2rem",
          overflowY: "scroll",
          position: "relative",
          "&::WebkitScrollbar": {
            width: ".1rem",
            display: "none",
          },
          scrollbarWidth: ".1rem",
          scrollbarColor: "transparent",
        }}
        flexDirection="column"
      >
        <div ref={quillRef} />

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
