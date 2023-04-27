import Avatar from "components/Avatar";
import TitleComponent from "components/CustomModal/TitleComponent";
import { ShowError } from "components/Dialogs/Dialogs";
import FormValidate from "components/FormValidate/FormValidate";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import TableLabor from "components/StafffNewDesign/TableLabor";
import { Textarea } from "components/input/Textarea";
import { FormItemInterface } from "components/interface";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListRank from "hooks/Select/useSelectListRank";
import useSelectListStaffType from "hooks/Select/useSelectListStaffType";
import useSelectTrainType from "hooks/Select/useSelectTrainType";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Checkbox,
  DatePicker,
  InputNumber,
  Modal,
  SelectPicker,
  TagPicker,
  Toggle,
} from "rsuite";
import Learn_Course_service from "services/Course/Train_Course/Learn_Course_service";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";
import { setCheckEdit } from "store/reducers/ui";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";

interface StaffLearn {
  StaffCode?: string;
  ss_StaffName?: string;
  md_DepartmentName?: string;
  mp_PositionName?: string;
  ss_AvatarFilePath?: string;
  LUDTimeUTCCourse?: any;
  LUDTimeUTCChapter?: any;
  LogLUDTimeUTC?: any;
}

export default function CourseDetailInfor({ categoryForm, setFormEdit }: any) {
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const _l = useLocalization("CourseDetailInfor");
  const _p = useLocalization("Placeholder");
  const { codeCourse } = useParams();
  const _t = useLocalization("toast");
  const listRank = useSelectListRank();
  const listDeparment = useSelectListDepartment();
  const listTrain = useSelectTrainType();
  const [open, setOpen] = useState(false);
  const [dataStaff, setDataStaffCourse] = useState([]);
  const [dataCheck, setDataChecked] = useState([] as any);
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchStaffCourse = async () => {
    const resp = await Learn_Course_service.getTotal(codeCourse, "learn");
    setDataStaffCourse(resp.Data.Lst_Learn_Course);
    return resp;
  };

  const fetchCourseDetail = async () => {
    const resp = await Train_Course_service.getByTrCsCodeSys(
      codeCourse as string
    ).then((resp: any) => {
      if (resp.Success) {
        setFormValue({
          TrCsName: resp.Data.Train_Course.TrCsName,
          TrCsDesc: resp.Data.Train_Course.TrCsDesc,
          PassPercent: resp.Data.Train_Course.PassPercent + "%",
          TotalStaff: resp.Data.Train_Course.TotalStaff,
          TotalFinish: resp.Data.Train_Course.TotalFinish,
          TotalLearn: resp.Data.Train_Course.TotalLearn,
          RankName: resp.Data.Train_Course.RankName,
          TrCsStatus: resp.Data.Train_Course.TrCsStatus,
          mdept_DepartmentName: resp.Data.Lst_Train_CourseDepartment.map(
            (item: any) => item.mdept_DepartmentName
          ),
          mrk_RankDesc: resp.Data.Lst_Train_CourseRank.map(
            (item: any) => item.mrk_RankDesc
          ),
          mtrtp_TrainTypeName: resp.Data.Train_Course.mtrtp_TrainTypeName,
          CreateDTimeUTC: new Date(resp.Data.Train_Course.CreateDTimeUTC),
          LogLUDTimeUTC: new Date(resp.Data.Train_Course.LogLUDTimeUTC),
        });
      } else {
        ShowError(resp.ErrorData);
      }
    });
    return resp;
  };
  useEffect(() => {
    fetchCourseDetail();
    fetchStaffCourse();
  }, []);
  useEffect(() => {
    fetchCourseDetail();
    fetchStaffCourse();
  }, [checkEdit]);

  const listFormItem: FormItemInterface[] = [
    {
      label: _l("Tên khóa học"), // Mã nhân viên
      required: true,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          rule: requiredRule,
          name: "TrCsName",
          placeholder: _p("Nhập"),
          className: "w-6",
        },
      ],
      Col: 11,
    },
    {
      label: _l("Hoàn thành"), // Họ tên
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          name: "PassPercent",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Phòng ban"), // Họ tên
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          data: listDeparment,
          name: "mdept_DepartmentName",
          rule: requiredRule,
          labelKey: "DepartmentName",
          valueKey: "DepartmentName",
          placeholder: _p("Nhập"),
          accepter: TagPicker,
        },
      ],
    },
    {
      label: _l("Thời gian đào tạo"), // Họ tên
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          name: "CreateDTimeUTC",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Rank"),
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          data: listRank,
          name: "mrk_RankDesc",
          accepter: TagPicker,
          placeholder: _p("Nhập"),
          labelKey: "RankDesc",
          valueKey: "RankDesc",
        },
      ],
    },
    {
      label: _l("Cập nhật"),
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          name: "LogLUDTimeUTC",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Mô tả"), // Th
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          name: "TrCsDesc",
          placeholder: _p("Nhập"),
          accepter: Textarea,
        },
      ],
    },
    {
      label: _l("Tổng học viên"), // Họ tên
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          accepter: InputNumber,
          name: "TotalStaff",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Loại"), // Họ tên
      Col: 11,
      control: [
        {
          data: listTrain,
          plaintext: categoryForm === "plaintext" ? false : true,
          name: "mtrtp_TrainTypeName",
          placeholder: _p("Nhập"),
          accepter: SelectPicker,
          labelKey: "TrainTypeName",
          valueKey: "TrainTypeName",
        },
      ],
    },
    {
      label: _l("Tổng hoàn thành"),
      Col: 11,
      control: [
        {
          plaintext: categoryForm === "plaintext" ? false : true,
          accepter: InputNumber,
          rule: dateRequiredRule,
          name: "TotalFinish",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Trạng thái"),
      Col: 11,
      control: [
        {
          name: "FlagUsed",
          placeholder: _p("Nhập"),
          defaultChecked: formValue.TrCsStatus === "PENDING" ? false : true,
          onChange: () => {
            setFormValue((p: any) => {
              return {
                ...p,
                TrCsStatus:
                  formValue.TrCsStatus === "REJECT" ? "PENDING" : "REJECT",
              };
            });
          },
          accepter: Toggle,
          checkedChildren: "Active",
          unCheckedChildren: "Inactive",
        },
      ],
    },
    {
      label: _l("Đang học"),
      Col: 11,
      customComponent: (
        <div
          style={{
            color: "blue",
            fontSize: "16px",
            textDecoration: "underline",
            paddingLeft: "10px",
            cursor: "pointer",
          }}
          onClick={handleOpen}>
          {formValue.TotalLearn}
        </div>
      ),
    },
  ];
  useEffect(() => {
    setFormEdit(formValue);
  }, [formValue]);

  const handleChecked = (e: any, checked: any) => {
    if (checked) {
      setDataChecked([
        ...dataCheck,
        { TrCsCodeSys: e.TrCsCodeSys, StaffCode: e.StaffCode },
      ]);
    } else {
      setDataChecked(
        dataCheck.filter((item: any) => item.StaffCode !== e.StaffCode)
      );
    }
  };
  const dataThApp = () => {
    return (
      <>
        {dataStaff?.map((td: StaffLearn, index: number) => (
          <tr key={index}>
            <td style={{ lineHeight: "40px" }}>
              <Checkbox
                value={td}
                onChange={(value, checked) =>
                  handleChecked(value, checked)
                }></Checkbox>
            </td>
            <td style={{ lineHeight: "40px" }}>{td.StaffCode}</td>
            <td>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Avatar
                  className="mr-2"
                  circle
                  src={
                    td.ss_AvatarFilePath
                      ? td.ss_AvatarFilePath
                      : td.ss_AvatarFilePath
                  }
                  text={`${
                    td.ss_StaffName ? td.ss_StaffName : td.ss_StaffName
                  }`}
                />
                <p>{td.ss_StaffName}</p>
              </div>
            </td>
            <td style={{ lineHeight: "40px" }}>
              {td.md_DepartmentName ? td.md_DepartmentName : "-----"}
            </td>
            <td style={{ lineHeight: "40px" }}>
              {td.mp_PositionName ?? "-----"}
            </td>
            <td style={{ lineHeight: "40px" }}>
              {td.LogLUDTimeUTC ? td.LogLUDTimeUTC : "-----"}
            </td>
            <td style={{ lineHeight: "40px" }}>
              {td.LUDTimeUTCCourse ?? "-----"}
            </td>
            <td style={{ lineHeight: "40px" }}>
              {td.LUDTimeUTCChapter ?? "------"}
            </td>
          </tr>
        ))}
      </>
    );
  };
  const handleApprove = async () => {
    if (dataCheck.length !== 0) {
      const resp = await Learn_Course_service.submit({
        type: "Approve",
        data: dataCheck,
      });
      if (resp.Success) {
        toast.success(_t("Xác nhận hoàn tất"));
        dispatch(setCheckEdit(resp));
      } else {
        ShowError(resp.ErrorData);
      }
    }
  };
  const handleReject = async () => {
    if (dataCheck.length !== 0) {
      const resp = await Learn_Course_service.submit({
        type: "Reject",
        data: dataCheck,
      });
      if (resp.Success) {
        dispatch(setCheckEdit(resp));
        toast.success(_t("Xác nhận hoàn tất"));
      } else {
        ShowError(resp.ErrorData);
      }
    }
  };

  return (
    <>
      <FormValidate
        ref={formRef}
        formValue={formValue}
        setFormValue={setFormValue}
        layout="vertical"
        listItem={listFormItem}
      />
      <Modal
        backdrop="static"
        className="modal-container"
        open={open}
        onClose={handleClose}
        size={"full"}>
        <TitleComponent flag={""} text={_l("Danh sách học viên đang học")} />
        <Modal.Body style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "18px",
              gap: "20px",
            }}>
            <SelectPicker
              data={listDeparment.map((item: any) => ({
                label: item.DepartmentName,
                value: item.DepartmentCode,
              }))}
              style={{ width: 350 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid green",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleApprove}>
                <img
                  src="https://devhrm.ecore.vn/assets/check-circle-238beccc.svg"
                  alt=""
                />
                <span style={{ color: "green" }}>Đạt</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid red",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleReject}>
                <img
                  src="	https://devhrm.ecore.vn/assets/x-circle-2e61ceb8.svg"
                  alt=""
                />
                <span style={{ color: "red" }}>Chưa đạt</span>
              </div>
            </div>
          </div>
          <TableLabor
            dataHeader={[
              "",
              "Mã nhân viên",
              "Tên nhân viên",
              "Phòng ban",
              "Chức danh",
              "Ngày bắt đầu học",
              "Ngày kiếm tra khóa học",
              "Ngày kiểm tra chương",
            ]}
            inforLabor={dataThApp()}
            data={dataStaff}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
