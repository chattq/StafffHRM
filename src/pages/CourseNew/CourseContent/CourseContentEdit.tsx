import { ShowError } from "components/Dialogs/Dialogs";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import UploadFileStaff from "components/StafffNewDesign/UploadFileStaff";
import { Textarea } from "components/input/Textarea";
import { FormItemInterface } from "components/interface";
import { useLocalization } from "hooks/useLocalization";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, IconButton, InputNumber, Stack, Uploader } from "rsuite";
import Train_Course_Chapter_service from "services/Course/Train_Course/Train_Course_Chapter_service";

import { dateRequiredRule, requiredRule } from "utils/validationRules";
import { Editor } from "@tinymce/tinymce-react";
import {
  FileTypeCustom,
  handleShouldUpdate,
  renderFileUploading,
} from "components/CustomModal/UpLoader";
import { buildHeaders, buildUrl } from "components/HeaderComponent/buidheaders";
import { MdAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";

export default function CourseContentEdit({
  button,
  onSuccess,
  data,
  flag,
  uuid,
  dataTable,
}: {
  button?: any;
  onSuccess?: any;
  data?: any;
  flag?: string;
  uuid?: string;
  dataTable?: any;
}) {
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const [flagProps, setFlagProps] = useState(flag);
  const { codeCourse } = useParams();
  const [fileContract, setFileContract] = useState("" as any);
  const [fileLaborUpdate, setFileLaborUpdate] = useState("" as any);
  const _l = useLocalization("ModalStaffEdit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [open, setOpen] = useState(false);
  const editorRef = useRef<any>(null);
  const [fileList, setFileList] = useState<any>([]);
  const [dataSlide, setDataSlide] = useState([] as any);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const [imgSlideShow, setIMGSlide] = useState(null as any);

  // console.log(56, imgSlideShow);
  useEffect(() => {
    setFlagProps(flag as string);
  }, [uuid, flag]);
  const handleOpen = () => {
    setFlagProps("update");
    setOpen(true);
  };
  const handleClose = () => {
    setFormValue({} as any);
    setOpen(false);
  };

  const [newText, setNewText] = useState();

  const fetchSlideShow = async () => {
    const resp = await Train_Course_Chapter_service.GetByChapterCodeSys(
      data?.ChapterCodeSys as any
    );
    if (resp.Success) {
      setDataSlide(resp?.Data.Lst_Train_CourseChapterInst);
    } else {
      ShowError(resp.ErrorData);
    }
    return resp;
  };

  const listFormItem: FormItemInterface[] = [
    {
      label: _l("Chương"), // phòng ban
      required: true,
      Col: 11,
      control: [
        {
          accepter: InputNumber,
          name: "ChapterIdx",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Test Pass"), // phòng ban
      required: true,
      Col: 10,
      control: [
        {
          name: "trc_PassPercent",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Tên chương"), // chức danh
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "ChapterName",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Mô tả tóm tắt"), // chức danh
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "ChapterDesc",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("File đính kèm"), // số quyết dịnh
      customComponent: (
        <div style={{ width: 300 }}>
          <UploadFileStaff
            setFileContract={setFileContract}
            fileLaborUpdate={fileLaborUpdate}
            formValue={formValue}
            setFormValue={setFormValue}
            flag={flagProps}
          />
        </div>
      ),
    },
    {
      label: _l("SlideShow"), // số tham chiếu
      control: [
        {
          name: "file",
          accepter: Uploader,
          fileList: fileList, // danh sách các tệp đã tải lên
          action: buildUrl("File/UploadFile"),
          headers: buildHeaders(),
          removable: true,
          multiple: false,
          placeholder: _p("Tải tệp"),
          children: <IconButton icon={<MdAttachFile />} />,
          shouldQueueUpdate: (
            fileList: FileTypeCustom[],
            newFile: FileTypeCustom[] | FileTypeCustom
          ) => {
            return handleShouldUpdate(fileList, newFile, ["jpg", "png"], true);
          },
          renderFileInfo: (
            fileType: FileTypeCustom,
            fileElement: ReactNode
          ) => {
            // return renderFileUploading(fileType, <></>, "update");
            // console.log(fileType);

            return (
              <div style={{ display: "flex" }}>
                <img width={120} height={120} src={fileType.url} alt="" />
              </div>
            );
          },
          onSuccess: (res: any, file: FileTypeCustom) => {
            if (res.Success) {
              setFileList((p: any) => {
                if (p) {
                  return [
                    ...p,
                    {
                      name: res.Data?.FileName,
                      FileName: res.Data?.FileName,
                      url: res.Data?.Url,
                    },
                  ];
                } else {
                  [
                    {
                      name: res.Data?.FileName,
                      FileName: res.Data?.FileName,
                      url: res.Data?.Url,
                    },
                  ];
                }
              });
              setIMGSlide({
                ImageType: "SLIDESHOW",
                ImageFileType: "JPG",
                ImageFileName: res.Data.FileName,
                ImageFilePath: res.Data.FilePath,
                FlagFileUpload: res.Data.FlagFileUpload,
                AttFileId: res.Data.AttFileId,
                ImageFileUrl: res.Data.Url,
              });
            }
          },

          onRemove: (file: FileTypeCustom) => {
            // setTimeout(() => {
            //   console.log("file hàm onRemove nè");
            //   // setFormValue({
            //   //   ...formValue,
            //   //   ContractFilePath: null,
            //   //   ContractFileName: null,
            //   //   ContractFileSize: null,
            //   //   ContractFileUrl: null,
            //   //   FlagFileUpload: "0",
            //   //   AttFileId: null,
            //   // });
            //   // isRemove = true;
            //   // setFileList([
            //   //   {
            //   //     name: null,
            //   //     FileSize: null,
            //   //     FileName: null,
            //   //   },
            //   // ]);
            // }, 0);
          },
        },
      ],
    },
    {
      label: _l("Mô tả chi tiết"), // kinh nghiệm làm việc
      customComponent: (
        <div style={{ width: "100%" }}>
          <Editor
            init={{
              menubar: false,
              height: 180,
            }}
            initialValue={flag === "detail" ? data.ChapterSpec : null}
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(newText: any) => setNewText(newText)}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    if (flag === "delete") {
      Train_Course_Chapter_service.remove(data.ChapterCodeSys).then(
        (resp: any) => {
          if (resp.Success) {
            toast.success(_t("Delete success !"));
            onSuccess();
            handleClose();
          } else {
            ShowError(resp.ErrorData);
          }
        }
      );
    } else {
      if (!formRef.current.check || !formRef.current) {
        return;
      }
      if (!formRef.current.check()) {
        return;
      } else {
        const condition = {
          ChapterIdx: formValue.ChapterIdx ? formValue.ChapterIdx : "",
          trc_PassPercent: formValue.trc_PassPercent
            ? formValue.trc_PassPercent
            : "",
          ChapterName: formValue.ChapterName ? formValue.ChapterName : "",
          ChapterDesc: formValue.ChapterDesc ? formValue.ChapterDesc : "",
          ChapterSpec: newText ? newText : "",
          ChapterCodeSys: flag === "detail" ? data.ChapterCodeSys : "",
          TrCsCodeSys: codeCourse,
          AttFileId: fileContract.AttFileId ? fileContract.AttFileId : null,
          ChapterFileName: fileContract.FileName ? fileContract.FileName : null,
          ChapterFileUrl: fileContract.Url ? fileContract.Url : null,
          ChapterFilePath: fileContract.FilePath ? fileContract.FilePath : null,
          ChapterFileSpec: null,
        };
        if (flagProps === "update") {
          Train_Course_Chapter_service.updateDetails({
            isNew: true,
            data: condition,
          }).then((resp: any) => {
            if (resp.Success) {
              toast.success(_t("Add SuccessFully"));
              onSuccess();
              setFormValue({});
              handleClose();
            } else {
              ShowError(resp.ErrorData);
            }
          });
        }
        if (flag === "detail") {
          Train_Course_Chapter_service.updateDetails({
            isNew: false,
            data: {
              Train_CourseChapter: condition,
              Lst_Train_CourseChapterInst: [],
            },
          }).then((resp: any) => {
            if (resp.Success) {
              toast.success(_t("Update SuccessFully"));
              onSuccess();
              handleClose();
            } else {
              ShowError(resp.ErrorData);
            }
          });
        }
        if (imgSlideShow !== null) {
          // Train_Course_Chapter_service.GetByChapterCodeSys()
        }
      }
    }
  };

  const render = () => {
    if (flag === "detail") {
      setFormValue({
        ChapterIdx: data.ChapterIdx,
        trc_PassPercent: data.trc_PassPercent,
        ChapterDesc: data.ChapterDesc,
        ChapterSpec: data.ChapterSpec,
        ChapterName: data.ChapterName,
      });
    }
  };
  useEffect(() => {
    fetchSlideShow();
    render();
    setFileLaborUpdate({
      ContractFileName: data?.ChapterFileName,
      ContractFileUrl: data?.ChapterFileUrl,
    });
    const newArr = dataSlide?.map((item: any) => ({
      name: item?.ImageFileName,
      FileName: item?.ImageFileName,
      url: item.ImageFileUrl,
    }));
    setFileList(newArr);
  }, [flag, uuid]);
  return (
    <>
      <ModalStaffEdit
        handleSubmit={handleSubmit}
        flagProps={flagProps}
        handleClose={handleClose}
        formRef={formRef}
        flag={flag}
        button={button}
        handleOpen={handleOpen}
        listFormItem={listFormItem}
        setFormValue={setFormValue}
        formValue={formValue}
        open={open}
      />
    </>
  );
}
