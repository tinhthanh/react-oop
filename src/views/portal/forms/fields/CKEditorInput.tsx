import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React ,{ forwardRef } from "react";

interface CKEditorInputProps {
  value: string;
  onChange: (data: string) => void;
}

const CKEditorInput = forwardRef<HTMLInputElement, CKEditorInputProps>(
  ({ value, onChange }, ref) => {
    const style = {'--ck-border-radius': '8px'} as React.CSSProperties;
    return (
      <div ref={ref} style={style}>
        <CKEditor
          config={{
            language: "vi",
            placeholder: "Nhập nội dung",
          }}
          editor={ClassicEditor}
          data={value || ""}
          onChange={(_, editor) => {
            const data = editor.getData();
            onChange(data); // Truyền trực tiếp giá trị mới
          }}
        />
      </div>
    );
  }
);

CKEditorInput.displayName = "CKEditorInput";

export default CKEditorInput;
