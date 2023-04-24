import { ShowError } from "components/Dialogs/Dialogs";
import FormValidate from "components/FormValidate/FormValidate";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import { Textarea } from "components/input/Textarea";
import { FormItemInterface } from "components/interface";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListRank from "hooks/Select/useSelectListRank";
import useSelectListStaffType from "hooks/Select/useSelectListStaffType";
import useSelectTrainType from "hooks/Select/useSelectTrainType";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DatePicker,
  InputNumber,
  SelectPicker,
  TagPicker,
  Toggle,
} from "rsuite";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";

export default function CourseDetailInfor({ categoryForm }: any) {
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const _l = useLocalization("CourseDetailInfor");
  const _p = useLocalization("Placeholder");
  const { codeCourse } = useParams();
  const _t = useLocalization("toast");
  const [dataCourse, setDataCourse] = useState([] as any);
  const listRank = useSelectListRank();
  const listDeparment = useSelectListDepartment();
  const listTrain = useSelectTrainType();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchCourseDetail = async () => {
    const resp = await Train_Course_service.getByTrCsCodeSys(
      codeCourse as string
    ).then((resp: any) => {
      if (resp.Success) {
        setDataCourse(resp.Data);
        setFormValue({
          TrCsName: resp.Data.Train_Course.TrCsName,
          TrCsDesc: resp.Data.Train_Course.TrCsDesc,
          PassPercent: resp.Data.Train_Course.PassPercent + "%",
          TotalStaff: resp.Data.Train_Course.TotalStaff,
          TotalFinish: resp.Data.Train_Course.TotalFinish,
          TotalLearn: resp.Data.Train_Course.TotalLearn,
          RankName: resp.Data.Train_Course.RankName,
          FlagUsed: resp.Data.Train_Course.FlagUsed,
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
  }, []);

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
          defaultChecked: formValue.FlagUsed === "0" ? false : true,
          onChange: () => {
            setFormValue((p: any) => {
              return {
                ...p,
                FlagUsed: formValue.FlagUsed === "0" ? "1" : "0",
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
        <ModalStaffEdit
          button={
            <div
              style={{
                color: "blue",
                fontSize: "16px",
                textDecoration: "underline",
                paddingLeft: "10px",
                cursor: "pointer",
              }}>
              {formValue.TotalLearn}
            </div>
          }
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          listFormItem={[]}
          flag={"totalStaff"}
        />
      ),
    },
  ];

  return (
    <>
      <FormValidate
        ref={formRef}
        formValue={formValue}
        setFormValue={setFormValue}
        layout="vertical"
        listItem={listFormItem}
      />
    </>
  );
}
