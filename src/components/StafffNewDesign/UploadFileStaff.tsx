import { buildHeaders } from "components/HeaderComponent/buidheaders";
import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Uploader } from "rsuite";
import { getNameFile } from "./IconUploadFIleStaff";

export default function UploadFileStaff({
  setFileContract,
  fileLaborUpdate,
  formValue,
  setFormValue,
}: any) {
  const uploader = useRef<any>();
  const [hide, setHide] = useState(false);
  const [valueUpdate, setValueUpdate] = useState([]);
  useEffect(() => {
    if (fileLaborUpdate.ContractFileName === undefined) {
      setValueUpdate([]);
    } else {
      setValueUpdate([
        {
          name: fileLaborUpdate.ContractFileName,
          FileUrl: fileLaborUpdate.ContractFileUrl,
          url: getNameFile(fileLaborUpdate.ContractFileName),
        },
      ] as any);
    }
  }, [fileLaborUpdate]);
  return (
    <>
      <Uploader
        ref={uploader}
        listType="picture-text"
        defaultFileList={valueUpdate}
        fileList={valueUpdate}
        multiple={false}
        removable={true}
        method="POST"
        children={
          <div style={{ display: hide ? "none" : "" }}>
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
        action={"//devapihrm.ecore.vn/File/UploadFile"}
        headers={buildHeaders()}
        onSuccess={(response, file) => setFileContract(response.Data)}
        renderFileInfo={(file: any, fileElement) => {
          setHide(true);
          return (
            <>
              <div style={{ color: "black" }}>{file.name}</div>
            </>
          );
        }}
        onRemove={(file) => {
          setHide(false);
          setFileContract({
            Url: "",
            FilePath: "",
            FlagFileUpload: "0",
            AttFileId: "",
            FileName: "",
            FileSize: "",
          });
          setFormValue({
            ...formValue,
            ContractFilePath: null,
            FlagFileUpload: "0",
            AttFileId: null,
            ContractFileName: null,
            ContractFileSize: null,
            ContractFileUrl: null,
          });
        }}
      />
    </>
  );
}
