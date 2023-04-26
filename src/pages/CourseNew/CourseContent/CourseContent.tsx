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
import { IconButton, Modal, Uploader } from "rsuite";
import TitleComponent from "components/CustomModal/TitleComponent";
import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";

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
  const [open, setOpen] = useState(false);
  const [dataCourse, setDataCourse] = useState({} as any);
  const [dataSilde, setDataSilde] = useState([] as any);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (data: any) => {
    setOpen(true);
    setDataCourse(data);
  };
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

  const fetchSildeShow = async () => {
    const resp = Train_Course_Chapter_service.GetByChapterCodeSys(
      dataCourse.ChapterCodeSys
    ).then((resp: any) => {
      if (resp.Success) {
        setDataSilde(resp.Data.Lst_Train_CourseChapterInst);
      } else {
        ShowError(resp.ErrorData);
      }
    });
    return resp;
  };

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
  useEffect(() => {
    fetchSildeShow();
  }, [dataCourse.ChapterCodeSys]);

  useEffect(() => {
    fetchSildeShow();
    fetchDataContentCourse();
  }, [checkEdit]);

  const dataThCourseContent = () => {
    return (
      <>
        {dataContentCourse?.map((td: CourseContent, index: number) => (
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
            <td
              style={{ cursor: "pointer" }}
              className="course"
              onClick={() => handleOpen(td)}>{`Chương ${td.ChapterIdx}`}</td>
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
    <>
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
      <Modal
        backdrop="static"
        className="modal-container"
        open={open}
        onClose={handleClose}
        size={"md"}>
        <TitleComponent
          flag={""}
          text={_l(
            `Chương ${dataCourse.ChapterIdx}: ${dataCourse.ChapterName}`
          )}
        />
        <Modal.Body style={{ padding: "20px 30px 20px 30px" }}>
          <div>
            <p>SildeShow</p>
            <div
              style={{ display: "flex", gap: 10, marginTop: "15px" }}
              className="sildeShow_scroll">
              {dataSilde === null ? (
                <div style={{ color: "black", textAlign: "center" }}>
                  Chưa cập nhật SildeShow
                </div>
              ) : (
                dataSilde.map((item: any) => (
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}>
                    <img
                      src={item.ImageFileUrl}
                      alt={item.ImageFileName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))
              )}
            </div>
            <div style={{ paddingTop: "20px" }}>
              <h3
                style={{
                  fontStyle: "italic",
                  fontSize: "18px",
                  textDecoration: "underline",
                }}>
                Nội dung chi tiết
              </h3>
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
                initialValue={
                  dataCourse.ChapterSpec
                    ? dataCourse.ChapterSpec
                    : "Đang cập nhật"
                }
                disabled={true}
                inline={true}
              />
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
              <p style={{ color: "black" }}>File đính kèm</p>
              {dataCourse.ChapterFilePath !== null ? (
                <div
                  style={{
                    padding: "5px 6px",
                    background: "#eaeaea",
                    borderRadius: "5px",
                    display: "flex",
                    gap: "10px",
                  }}>
                  <div style={{ width: 30, height: 30 }}>
                    <img
                      src={getNameFile(dataCourse.ChapterFileName)}
                      alt={dataCourse.ChapterFileName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <a href={dataCourse?.ChapterFileUrl} target="_blank">
                    {fileName(dataCourse?.ChapterFileName)}
                  </a>
                </div>
              ) : (
                <div>Đang cập nhật</div>
              )}
            </div>
            <div
              style={{
                width: "100%",
                border: "1px dashed",
                margin: "15px 0 15px 0",
              }}></div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginBottom: "0" }}>Kiểm tra hoàn thành:</p>
              <p
                style={{
                  marginBottom: "0",
                  marginTop: "0",
                  marginLeft: "20px",
                  fontSize: "15px",
                  color: "black",
                }}>{`${dataCourse.trc_PassPercent}%`}</p>
            </div>
          </div>
        </Modal.Body>
        <ModalFooterComponent onClose={handleClose} flag={""} />
      </Modal>
    </>
  );
}
