import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { Field } from "formik";

Quill.register("modules/emoji", Emoji);

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["emoji"],
  ["clean"],
];

export default function Editor(props) {
  console.log(props);
  const [value, setValue] = useState(props.value || "");
  const reactQuillRef = useRef(null);

  const onChange = (content) => {
    setValue(content);

    if (props.onChange) {
      props.onChange({
        html: content,
        markdown: content,
      });
    }
  };

  return (
    // <ReactQuill value={field.value} onChange={field.onChange(field.name)} />}

    <Field name={props.name}>
      {({ field }) => (
        <ReactQuill
          id={field.name}
          ref={reactQuillRef}
          theme="snow"
          placeholder="Start writing..."
          modules={{
            toolbar: {
              container: TOOLBAR_OPTIONS,
            },
            "emoji-toolbar": true,
            "emoji-textarea": false,
            "emoji-shortname": true,
          }}
          value={value}
          onChange={onChange}
          p
        />
      )}
    </Field>
  );
}
