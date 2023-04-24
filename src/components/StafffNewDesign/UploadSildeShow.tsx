import React, { useRef } from "react";
import { Uploader } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import { FiUpload } from "react-icons/fi";

export default function UploadSildeShow() {
  const uploader = useRef<any>();
  return (
    <>
      <Uploader
        ref={uploader}
        listType="picture"
        action="//jsonplaceholder.typicode.com/posts/"
        children={
          <div>
            <div
              onClick={() => {
                uploader.current.start();
              }}
              style={{
                color: "black",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}>
              Upload File <FiUpload fontSize={20} style={{ marginLeft: 10 }} />
            </div>
          </div>
        }
      />
    </>
  );
}
