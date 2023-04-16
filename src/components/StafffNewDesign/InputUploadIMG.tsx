import { Icon } from "@rsuite/icons";
import Avatar from "components/Avatar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UploadFile_service from "services/Staff/UploadFile_service";
import { BiCamera } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setDataImg } from "store/reducers/ui";
import staff_service from "services/Staff/staff_service";
import { useParams } from "react-router-dom";

export default function InputUploadIMG({ setIMGApi, imgStaff }: any) {
  const imgRef = useRef<any>();
  const [file, setFile] = useState<any>();
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);
  const handleUpload = () => {
    imgRef.current?.click();
  };
  const dispatch = useDispatch();
  const onFileChange = (event: any) => {
    const fileFromLocal = event.target.files?.[0];
    setFile(fileFromLocal);
  };
  const { staffCode } = useParams<string>();
  const fetchUpload = async () => {
    if (checkEdit && file) {
      const repsUpload = await UploadFile_service.UploadFile(file);
      await staff_service.upDateAvatar({
        Staff_Staff: {
          StaffCode: staffCode,
          AvatarFilePath: repsUpload.Data.FilePath,
          AvatarUrl: repsUpload.Data.Url,
          AvatarFileBase64: null,
          AvatarFileName: repsUpload.Data.FileName,
          FlagFileUpload: "1",
          AttFileId: repsUpload.Data.AttFileId,
        },
      });
    } else if (file) {
      const repsUpload = await UploadFile_service.UploadFile(file);
      setIMGApi(repsUpload?.Data);
    }
  };

  useEffect(() => {
    fetchUpload();
  }, [file]);

  return (
    <>
      <div
        style={{
          height: checkEdit ? "100px" : "130px",
          width: checkEdit ? "100px" : "130px",
          border: "1px solid",
          overflow: "hidden",
          borderRadius: "100%",
          cursor: "pointer",
        }}
        onClick={handleUpload}>
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
          <Avatar
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={previewImage || imgStaff}
          />
          <input type="file" ref={imgRef} hidden onChange={onFileChange} />
          <div
            style={{
              position: "absolute",
              height: "126px",
              width: "130px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "999",
              top: checkEdit ? "-13px" : "",
              left: checkEdit ? "-15px" : "",
            }}>
            <Icon
              as={BiCamera}
              style={{ fontSize: "30px", color: "red" }}></Icon>
          </div>
        </div>
      </div>
    </>
  );
}
