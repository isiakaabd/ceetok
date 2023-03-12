// import React, { useEffect, useRef, useState } from "react";
// // import { useQuill } from "react-quilljs";
// // import hljs from "highlight.js";
// import "react-quill/dist/quill.snow.css";
// import "quill-emoji/dist/quill-emoji.css";
// // import BlotFormatter from "quill-blot-formatter";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Field, useFormikContext } from "formik/dist";
// import { TextError } from "validation/TextError";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// // Quill.register(BlotFormatter, true);
// // const validation = Yup.object({
// //   title: Yup.string("Enter Title").required("Required"),
// //   category: Yup.string("Enter Category").required("Required"),
// //   text: Yup.string("Enter Category").required("Required"),
// //   // name: Yup.string("Enter Your name").required("Name is ").trim(),
// // });
// import * as Emoji from "quill-emoji";
// const Font = Quill.import("formats/font");
// Quill.register("modules/emoji", Emoji);

// const Size = Quill.import("formats/size");
// Size.whitelist = ["extra-small", "small", "medium", "large"];
// Quill.register(Size, true);

// // Add fonts to whitelist and register them
// Font.whitelist = [
//   "arial",
//   "comic-sans",
//   "courier-new",
//   "georgia",
//   "helvetica",
//   "lucida",
// ];
// Quill.register(Font, true);
// // hljs.registerLanguage("javascript", javascript);
// const Editor = ({ theme, name, placeholder, type, value, upload_id }) => {
//   const toolbar = [
//     ["bold", "italic", "underline"],
//     [{ align: [] }, { indent: "-1" }, { indent: "+1" }],

//     ["blockquote", { list: "ordered" }, { list: "bullet" }],
//     ["code-block"],
//     [{ direction: "rtl" }],

//     ["align", "strike", { script: "sub" }, { script: "super" }],
//     ["link", "image", "video"],
//     [{ color: ["#37D42A", "#fff", "#f00"] }, { background: [] }],
//     ["emoji"],
//     [{ font: [] }]["clean"],
//   ];

//   // link: true,

//   const format = [
//     "bold",
//     "italic",
//     "blockquote",
//     "code-block",
//     "font",
//     "twitter",
//     "size",
//     "underline",
//     "emoji",
//     "background",
//     "color",
//     "script",
//     "strike",
//     "sub",
//     "align",
//     "header",
//     "strike",
//     "super",
//     "label",
//   ];

//   const token = useSelector((state) => state.auth.token);
//   const { setFieldValue, errors, values } = useFormikContext();

//   // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
//   const saveToServer = async (file) => {
//     const form = new FormData();
//     form.append("type", type);
//     form.append("media", file);

//     // const res = await uploadImage(form);
//     // process.env.REACT_APP_UPLOAD;
//     fetch(process.env.REACT_APP_UPLOAD, {
//       method: "POST",
//       body: form,
//       headers: {
//         // 👇 Set headers manually for single file upload
//         AUTHORIZATION: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         toast.success(data.message);
//         setFieldValue(upload_id, data.body.post_id);
//       })
//       .catch((err) => toast.error(err));

//     // insertToEditor(res.uploadedImageUrl);
//   };
//   // const addLink = () => {
//   //   const url = window.prompt("Enter the URL");
//   //   // const text = quill.getSelection(true).text;
//   //   quill.format("link", url, "user");
//   //   quill.formatText(quill.getSelection(), { link: url }, "user");
//   // };

//   // Open Dialog to select Image File
//   const selectLocalImage = () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.setAttribute("multiple", true);
//     input.click();

//     input.onchange = (e) => {
//       const file = input.files[0];
//       saveToServer(file);
//     };
//   };
//   const reactQuillRef = useRef(null);

//   return (
//     <>
//       <div className="text-editor">
//         <Field name={name}>
//           {({ field }) => (
//             <>
//               <QuillToolbar />
//               <ReactQuill
//                 value={values[name]}
//                 //              quill.on("text-change", (e) => {
//                 //   setFieldValue(name, quill.root.innerHTML);
//                 // });

//                 // onChangeSelection={(e) => console.log(e)}
//                 // onChange={setState}
//                 onChangeSelection={(e) => setFieldValue(name, e)}
//                 formats={format}
// modules={{
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       image: selectLocalImage,
//       undo: undoChange,
//       redo: redoChange,
//       twitter: () => toast.success("feature coming..."),
//       // emoji: function () {},
//     },
//   },
//                   history: {
//                     delay: 500,
//                     maxStack: 100,
//                     userOnly: true,
//                   },
//                   "emoji-toolbar": true,
//                   "emoji-textarea": false,
//                   "emoji-shortname": true,
//                 }}
//               />
//             </>
//           )}
//         </Field>
//       </div>

//       {errors[name] && <TextError>{errors[name]}</TextError>}
//     </>
//   );
// };
// export const QuillToolbar = () => {
//   return (
//     <div id="toolbar">
//       <span className="ql-formats">
//         <select className="ql-font" defaultValue="arial">
//           <option value="arial">Arial</option>
//           <option value="comic-sans">Comic Sans</option>
//           <option value="courier-new">Courier New</option>
//           <option value="georgia">Georgia</option>
//           <option value="helvetica">Helvetica</option>
//           <option value="lucida">Lucida</option>
//         </select>
//         <select className="ql-size" defaultValue="medium">
//           <option value="extra-small">Size 1</option>
//           <option value="small">Size 2</option>
//           <option value="medium">Size 3</option>
//           <option value="large">Size 4</option>
//         </select>
//         <select className="ql-header" defaultValue="3">
//           <option value="1">Heading</option>
//           <option value="2">Subheading</option>
//           <option value="3">Normal</option>
//         </select>
//       </span>
//       <span className="ql-formats">
//         <button className="ql-bold" />
//         <button className="ql-italic" />
//         <button className="ql-underline" />
//         <button className="ql-strike" />
//       </span>
//       <span className="ql-formats">
//         <button className="ql-list" value="ordered" />
//         <button className="ql-list" value="bullet" />
//         <button className="ql-indent" value="-1" />
//         <button className="ql-indent" value="+1" />
//       </span>
//       <span className="ql-formats">
//         <button className="ql-script" value="super" />
//         <button className="ql-script" value="sub" />
//         <button className="ql-blockquote" />
//         <button className="ql-direction" />
//       </span>
//       <span className="ql-formats">
//         <select className="ql-align" />
//         <select className="ql-color" />
//         <select className="ql-background" />
//       </span>
//       <span className="ql-formats">
//         <button className="ql-link" />
//         <button className="ql-image" />
//         <button className="ql-video" />
//       </span>
//       <span className="ql-formats">
//         <button className="ql-formula" />
//         <button className="ql-code-block" />
//         <button className="ql-clean" />
//       </span>
//       {/* <span className="ql-formats">
//         <button className="ql-twitter">
//           <Twitter />
//         </button>
//       </span> */}
//       <span className="ql-formats">
//         <button className="ql-undo" value="undo">
//           <CustomUndo />
//         </button>
//         <button className="ql-redo" value="redo">
//           <CustomRedo />
//         </button>
//         <button className="ql-twitter">
//           <Twitter />
//         </button>
//       </span>
//     </div>
//   );
// };
// const Twitter = () => (
//   <svg viewBox="0 0 58 58">
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M0 29.1619C0 43.5798 10.4714 55.5688 24.1667 58V37.0548H16.9167V29H24.1667V22.5548C24.1667 15.3048 28.8381 11.2786 35.4453 11.2786C37.5381 11.2786 39.7952 11.6 41.8881 11.9214V19.3333H38.1833C34.6381 19.3333 33.8333 21.1047 33.8333 23.3619V29H41.5667L40.2786 37.0548H33.8333V58C47.5286 55.5688 58 43.5822 58 29.1619C58 13.1225 44.95 0 29 0C13.05 0 0 13.1225 0 29.1619Z"
//     />
//     {/* <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
//     <path
//       className="ql-stroke"
//       d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" */}
//     {/* /> */}
//   </svg>
// );

// const CustomUndo = () => (
//   <svg viewBox="0 0 18 18">
//     <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
//     <path
//       className="ql-stroke"
//       d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
//     />
//   </svg>
// );

// // Redo button icon component for Quill editor
// const CustomRedo = () => (
//   <svg viewBox="0 0 18 18">
//     <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
//     <path
//       className="ql-stroke"
//       d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
//     />
//   </svg>
// );

// // Undo and redo functions for Custom Toolbar
// function undoChange() {
//   this.quill.history.undo();
// }
// function redoChange() {
//   this.quill.history.redo();
// }
// // Redo button icon component for Quill editor

// export default Editor;
