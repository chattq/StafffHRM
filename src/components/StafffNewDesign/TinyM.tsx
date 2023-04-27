import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
export default function TinyM({ initialValue, limit }: any) {
  const sizeLimit = limit ?? 50;
  const [value, setValue] = React.useState(initialValue ?? "");
  const [length, setLength] = React.useState(0);

  const handleInit = (evt: any, editor: any) => {
    setLength(editor.getContent({ format: "text" }).length);
  };

  const handleUpdate = (value: any, editor: any) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= sizeLimit) {
      setValue(value);
      setLength(length);
    } else {
      toast.warning(`Không được nhập quá ${sizeLimit}`);
    }
  };

  const handleBeforeAddUndo = (evt: any, editor: any) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length > sizeLimit) {
      evt.preventDefault();
    }
  };

  return (
    <>
      <Editor
        init={{
          menubar: false,
          height: 180,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste imagetools wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        initialValue={initialValue}
        value={value}
        onInit={handleInit}
        onEditorChange={handleUpdate}
        onBeforeAddUndo={handleBeforeAddUndo}
      />
    </>
  );
}
