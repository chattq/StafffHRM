import { buildHeaders } from "components/HeaderComponent/buidheaders";
import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Uploader } from "rsuite";
import { getNameFile } from "./IconUploadFIleStaff";
import { fileName } from "./SpliceName";

export default function UploadFileStaff({
  setFileContract,
  fileLaborUpdate,
  formValue,
  setFormValue,
  flag,
}: any) {
  const uploader = useRef<any>();
  const [hide, setHide] = useState(false);
  const [valueUpdate, setValueUpdate] = useState([]);
  useEffect(() => {
    if (fileLaborUpdate.ContractFileName === null) {
      setValueUpdate([]);
      setHide(false);
    } else if (flag === "update") {
      setValueUpdate([]);
    } else {
      setValueUpdate([
        {
          name: fileLaborUpdate.ContractFileName,
          url: getNameFile(fileLaborUpdate.ContractFileName),
        },
      ] as any);
    }
  }, [fileLaborUpdate.ContractFileName, flag]);
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
              <div
                style={{
                  color: "black",
                  paddingTop: 10,
                }}>
                {fileName(file.name)}
              </div>
            </>
          );
        }}
        renderThumbnail={(file: any, thumbnai: any) => {
          return <img src={getNameFile(file.name)} alt={file.name} />;
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
