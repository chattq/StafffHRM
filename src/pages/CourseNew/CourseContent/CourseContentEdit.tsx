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
import { v4 as uuidv4 } from "uuid";
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
import { setCheckEdit } from "store/reducers/ui";
import { useDispatch } from "react-redux";
import TinyM from "components/StafffNewDesign/TinyM";

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
  // console.log(data?.ChapterCodeSys);
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const [flagProps, setFlagProps] = useState(flag);
  const { codeCourse } = useParams();
  const [fileContract, setFileContract] = useState("" as any);
  const [fileLaborUpdate, setFileLaborUpdate] = useState("" as any);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const _l = useLocalization("ModalStaffEdit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [open, setOpen] = useState(false);
  const editorRef = useRef<any>(null);
  const [fileList, setFileList] = useState<any>([]);

  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;
  const [removeSlideImgs, setRemoveSlideImgs] = useState<any[]>([]);
  const dispatch = useDispatch();

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
      if (resp?.Data?.Lst_Train_CourseChapterInst === null) {
        setFileList([]);
      } else if (resp?.Data?.Lst_Train_CourseChapterInst.length !== 0) {
        const newArr = resp?.Data?.Lst_Train_CourseChapterInst.map(
          (item: any) => {
            return {
              ChapterInstCodeSys: item.ChapterInstCodeSys,
              Idx: 1,
              ImageType: "SLIDESHOW",
              ImageFileType: "JPG",
              ImageFileName: item.ImageFileName,
              Remark: "",
              ImageFileUrl: item.ImageFileUrl,
              FlagFileUpload: "1",
              AttFileId: "51f7dae8-61ad-410b-8b64-420490fc1385.jpg",
              ImageFilePath: item.ImageFilePath,
            };
          }
        );
        setFileList(newArr);
      }
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
          rule: requiredRule,
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
          rule: requiredRule,
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
          multiple: true,
          placeholder: _p("Tải tệp"),
          children: <IconButton icon={<MdAttachFile />} />,
          shouldQueueUpdate: (
            fileList: FileTypeCustom[],
            newFile: FileTypeCustom[] | FileTypeCustom
          ) => {
            return handleShouldUpdate(fileList, newFile, ["jpg", "png"], true);
          },
          renderFileInfo: (fileType: any, fileElement: ReactNode) => {
            return (
              <div style={{ borderRadius: "8px", overflow: "hidden" }}>
                <img
                  width={105}
                  height={105}
                  src={fileType.ImageFileUrl}
                  alt=""
                />
              </div>
            );
          },
          onSuccess: (res: any, file: any) => {
            if (res.Success) {
              const fileIMG = {
                ChapterInstCodeSys: "",
                ChapterCodeSys: data?.ChapterCodeSys
                  ? data?.ChapterCodeSys
                  : "",
                Idx: 1,
                ImageType: "SLIDESHOW",
                ImageFileType: "JPG",
                ImageFileName: res.Data.FileName,
                ImageFilePath: res.Data.FilePath,
                Remark: "",
                AttFileId: res.Data.AttFileId,
                ImageFileUrl: res.Data.Url,
                FlagFileUpload: "1",
              };
              setFileList([...fileList, fileIMG]);
            }
          },
          onRemove: (file: any) => {
            if (flag === "detail") {
              setRemoveSlideImgs((prevImg: any) => {
                if (Array.isArray(prevImg)) {
                  return [...prevImg, file.ChapterInstCodeSys];
                } else {
                  return [file.ChapterInstCodeSys];
                }
              });
            }
            const fileRemove = fileList.filter((item1: any) => {
              return item1.ImageFileName !== file.ImageFileName;
            });
            setFileList(fileRemove);
          },
        },
      ],
    },
    {
      label: _l("Mô tả chi tiết"), // kinh nghiệm làm việc
      customComponent: (
        <div style={{ width: "100%" }}>
          <TinyM
            initialValue={flag === "detail" ? data.ChapterSpec : null}
            limit={40}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
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
          NetworkID: NetWorkID,
          OrgID: NetWorkID,
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
            data: {
              Train_CourseChapter: condition,
              Lst_Train_CourseChapterInst: fileList,
            },
          }).then((resp: any) => {
            if (resp.Success) {
              toast.success(_t("Add SuccessFully"));
              onSuccess();
              setFormValue({});
              handleClose();
              setFileList([]);
            } else {
              ShowError(resp.ErrorData);
              setFileList([]);
            }
          });
        }

        if (flag === "detail") {
          removeSlideImgs?.forEach((value: any) => {
            Train_Course_Chapter_service.removeSlide(value);
          });
          const resp1 = await Train_Course_Chapter_service.getByChapterCode(
            data?.ChapterCodeSys
          );

          if (resp1.Success) {
            Train_Course_Chapter_service.updateDetails({
              isNew: false,
              data: {
                Train_CourseChapter: condition,
                Lst_Train_CourseChapterInst: fileList,
              },
            }).then((resp: any) => {
              if (resp.Success) {
                toast.success(_t("Update SuccessFully"));
                dispatch(setCheckEdit(resp));
                onSuccess();
                handleClose();
              } else {
                ShowError(resp.ErrorData);
              }
            });
          }
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
    if (flag === "detail") {
      fetchSlideShow();
      render();
      setFileLaborUpdate({
        ContractFileName: data?.ChapterFileName,
        ContractFileUrl: data?.ChapterFileUrl,
      });
    }
  }, [flag, uuid]);
  useEffect(() => {
    fetchSlideShow();
  }, [checkEdit]);
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
