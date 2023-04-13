import Avatar from "components/Avatar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Staff_Appoint_service from "services/Staff/Staff_Appoint_service";
import Uploader from "services/Staff/UploadFile_service";
import UploadFile_service from "services/Staff/UploadFile_service";

export default function InputUploadIMG() {
  const imgRef = useRef<any>();
  const [file, setFile] = useState<any>();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);
  const handleUpload = () => {
    imgRef.current?.click();
  };
  const onFileChange = (event: any) => {
    const fileFromLocal = event.target.files?.[0];
    imgRef.current?.setAttribute("value", "");
    setFile(fileFromLocal);
  };

  const fetchUpload = async () => {
    if (file) {
      const form = new FormData();
      form.append("image", file);
      const reps = await UploadFile_service.UploadFile(form);
      console.log(reps);
    }
  };

  useEffect(() => {
    fetchUpload();
  }, [file]);

  return (
    <div
      style={{
        height: "130px",
        width: "130px",
        border: "1px solid",
        overflow: "hidden",
        borderRadius: "100%",
      }}
      onClick={handleUpload}>
      <Avatar
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={previewImage}
      />
      <input type="file" ref={imgRef} hidden onChange={onFileChange} />
    </div>
  );
}
