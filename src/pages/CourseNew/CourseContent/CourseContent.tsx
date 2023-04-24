import { ShowError } from "components/Dialogs/Dialogs";
import TableLabor from "components/StafffNewDesign/TableLabor";
import { useLocalization } from "hooks/useLocalization";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Train_Course_Chapter_service from "services/Course/Train_Course/Train_Course_Chapter_service";
import CourseContentEdit from "./CourseContentEdit";
import EditComponent from "components/EditCell/EditCellComponent";
import { getNameFile } from "components/StafffNewDesign/IconUploadFIleStaff";
import { v4 as uuid } from "uuid";
import { Editor } from "@tinymce/tinymce-react";
import { fileName } from "components/StafffNewDesign/SpliceName";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import {
  FileTypeCustom,
  handleShouldUpdate,
  renderFileUploading,
} from "components/CustomModal/UpLoader";
import { IconButton, Uploader } from "rsuite";
import { buildHeaders, buildUrl } from "components/HeaderComponent/buidheaders";
import { MdAttachFile } from "react-icons/md";
import { FormItemInterface } from "components/interface";
import { requiredRule } from "utils/validationRules";
import UploadFileStaff from "components/StafffNewDesign/UploadFileStaff";

interface CourseContent {
  ChapterName?: string;
  ChapterDesc?: string;
  trc_PassPercent?: string;
  ChapterFileUrl?: string;
  ChapterFileName?: string;
  ChapterIdx?: any;
}

export default function CourseContent() {
  const _l = useLocalization("CourseContent");
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const { codeCourse } = useParams();
  const [dataContentCourse, setDataContentCourse] = useState([]);
  const [flag, setFlag] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const [id, setId] = useState("");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");

  const fetchDataContentCourse = async () => {
    const Resp = await Train_Course_Chapter_service.getByTrCsCodeSys(
      codeCourse as string
    ).then((resp: any) => {
      if (resp.Success) {
        setDataContentCourse(resp?.Data.Lst_Train_CourseChapter);
      } else {
        ShowError(resp.ErrorData);
      }
    });
    return Resp;
  };
  useEffect(() => {
    fetchDataContentCourse();
  }, []);
  const handleEdit = (data: any) => {
    setFlag("detail");
    setDataEdit(data);
    setId(uuid());
  };

  const handleDeleteSingle = (data: any) => {
    setFlag("delete");
    setDataEdit(data);
    setId(uuid());
  };
  const handleAdd = () => {
    setFlag("update");
    setId(uuid());
  };
  const dataThCourseContent = () => {
    return (
      <>
        {dataContentCourse.map((td: CourseContent, index: number) => (
          <tr key={index}>
            {checkEdit && (
              <td>
                <CourseContentEdit
                  button={
                    <EditComponent
                      handleEdit={handleEdit}
                      data={td}
                      handleDeleteSingle={handleDeleteSingle}
                    />
                  }
                  data={dataEdit}
                  flag={flag}
                  uuid={id}
                  onSuccess={fetchDataContentCourse}
                />
              </td>
            )}
            <td>{`Chương ${td.ChapterIdx}`}</td>
            <td>{td.ChapterName}</td>
            <td>{td.ChapterDesc}</td>
            <td>{td.trc_PassPercent + "%"}</td>
            {td.ChapterFileUrl === null ? (
              <td></td>
            ) : (
              <td>
                <a href={td.ChapterFileUrl} style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px", height: "20px" }}>
                    <img
                      src={getNameFile(td.ChapterFileName)}
                      alt={td.ChapterFileName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  {fileName(td.ChapterFileName)}
                </a>
              </td>
            )}
          </tr>
        ))}
      </>
    );
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px 0 30px",
        }}>
        <div
          style={{
            textTransform: "uppercase",
            color: "black",
            fontWeight: "600",
          }}>
          {_l("Nội dung khóa học")}
        </div>
        {checkEdit ? (
          <CourseContentEdit
            button={
              <div
                style={{
                  border: "1px solid",
                  padding: "5px 15px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  background: "#fff6f6",
                  color: "black",
                  fontWeight: "600",
                }}
                onClick={handleAdd}>
                {_l("Thêm nội dung")}
              </div>
            }
            onSuccess={fetchDataContentCourse}
          />
        ) : null}
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableLabor
          dataHeader={[
            "Chương",
            "Tên Chương",
            "Mô tả tóm tắt",
            "Test Pass",
            "Chi tiết",
          ]}
          inforLabor={dataThCourseContent()}
          data={dataContentCourse}
          setId={setId}
        />
      </div>
    </div>
  );
}
