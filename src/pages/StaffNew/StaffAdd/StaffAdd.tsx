import React from "react";
import { Link } from "react-router-dom";
import { Button } from "rsuite";
import Avatar from "components/Avatar";
import FormValidate from "components/FormValidate/FormValidate";
import InputUploadIMG from "components/StafffNewDesign/InputUploadIMG";
import { Textarea } from "components/input/Textarea";
import useListTypeReward from "hooks/Select/useListReward";
import useSelectListStaff from "hooks/Select/useSelectListStaff";
import { useLocalization } from "hooks/useLocalization";
import { useMemo, useRef, useState } from "react";
import { AutoComplete, Checkbox, DatePicker, SelectPicker } from "rsuite";
import { dateRequiredRule, requiredRule } from "utils/validationRules";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import { StaffAddType } from "components/StafffNewDesign/TypeStaff";
import staff_service from "services/Staff/staff_service";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import useListOrg from "hooks/Select/useListOrg";
import useSelectListGender from "hooks/Select/useSelectListGender";
import useSelectListStaffType from "hooks/Select/useSelectListStaffType";

type Props = {
  flag?: string;
  code?: any;
  onSuccess?: Function;
  uuid?: string;
};
export default function StaffAdd({ flag, code, onSuccess, uuid }: Props) {
  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;

  const _l = useLocalization("Staff_Reward_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const formRef: any = useRef(null);
  const [flagProps, setFlagProps] = useState(flag);
  const [formValue, setFormValue] = useState({} as StaffAddType);
  const selectListStaff = useSelectListStaff();
  const selectListReward = useListTypeReward();

  const listDepartment = useSelectListDepartment();
  const listOrg = useListOrg();
  const listPosition = useSelectListPosition();
  const listGender = useSelectListGender();
  const staffType = useSelectListStaffType();
  const staff = useSelectListStaff();

  const listFormItem: any[] = [
    {
      label: _l("Mã nhân viên"), // Mã nhân viên
      required: true,
      control: [
        {
          name: "StaffCodeUser",
          placeholder: _p("Nhập"),
        },
      ],
      Col: 11,
    },
    {
      label: _l("Họ tên"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "StaffFullName",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("OrgID"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "OrgID",
          accepter: SelectPicker,
          data: listOrg,
          labelKey: "mnnt_NNTFullName",
          valueKey: "mnnt_NNTFullName",
        },
      ],
    },
    {
      label: _l("Loại"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "StaffType",
          accepter: SelectPicker,
          data: staffType,
          placeholder: _p("Nhập"),
          labelKey: "GroupName",
          valueKey: "StaffType",
        },
      ],
    },
    {
      label: _l("Giới tính"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "StaffCode",
          accepter: SelectPicker,
          data: listGender,
          labelKey: "GenderCode",
          valueKey: "GenderCode",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Điện thoại"), // Họ tên
      Col: 11,
      control: [
        {
          name: "StaffPhone",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("TK công ty"), // Họ tên
      Col: 11,
      control: [
        {
          name: "UserID",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Nơi sinh"), // Họ tên
      Col: 11,
      control: [
        {
          name: "BirthPlace",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Địa Chỉ"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "StaffAddress",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Địa chỉ thường trú"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "PermanentAddress",
          accepter: Textarea,
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Phòng ban"),
      required: true,
      Col: 11,
      control: [
        {
          name: "md_DepartmentName",
          accepter: SelectPicker,
          placeholder: _l("Phòng ban"),
          data: listDepartment,
          labelKey: "DepartmentName",
          valueKey: "DepartmentCode",
        },
        {
          name: "md_DepartmentName",
          accepter: SelectPicker,
          placeholder: _l("Phòng ban"),
          data: listDepartment,
          labelKey: "DepartmentName",
          valueKey: "DepartmentCode",
        },
      ],
    },
    {
      label: _l("DOB"), // Th
      Col: 11,
      control: [
        {
          name: "DateForm",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Bắt đầu"), // Th
      required: true,
      Col: 11,
      control: [
        {
          name: "WorkingStartDate",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Nghỉ việc"), // Th
      Col: 11,
      control: [
        {
          name: "WorkingEndDate",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Ghi chú"), // kinh nghiệm làm việc
      Col: 11,
      control: [
        {
          name: "Remark",
          accepter: Textarea,
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Số giấy tờ"), // kinh nghiệm làm việc
      Col: 11,
      control: [
        {
          name: "IDCardNumber",
          placeholder: _p("Nhập"),
        },
        {
          name: "GovIDType",
          accepter: SelectPicker,
          placeholder: _p("Loại giấy tờ"),
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (!formRef.current.check || !formRef.current) {
      return;
    }
    if (!formRef.current.check()) {
      return;
    } else {
      const condition = {
        Staff_Staff: {
          StaffCodeUser: formValue.StaffCodeUser ? formValue.StaffCodeUser : "",
          StaffFullName: formValue.StaffFullName ? formValue.StaffFullName : "",
          StaffAddress: formValue.StaffAddress ? formValue.StaffAddress : "",
          StaffPhone: formValue.StaffPhone ? formValue.StaffPhone : "",
          OrgID: "4221896000",
          Remark: formValue.Remark ? formValue.Remark : "",
          WorkingEndDate: new Date(formValue.WorkingEndDate),
          WorkingStartDate: new Date(formValue.WorkingStartDate),
          BirthPlace: formValue.BirthPlace ? formValue.BirthPlace : "",
          UserID: formValue.UserID ? formValue.UserID : "",
          StaffLastName: "Đại",
          StaffName: "Đế",
          StaffType: "STAFFTYPE.C39.00061",
          PermanentAddress: formValue.PermanentAddress
            ? formValue.PermanentAddress
            : "",
        },
        Lst_Staff_MapDepartment: [
          {
            DepartmentCode: "DC.220330A",
            PositionCode: "POSITIONCODE.C3A.00041",
          },
        ],
      };
      staff_service
        .update({ isNew: true, data: condition })
        .then((resp: any) => {
          if (resp.Success) {
            toast.success(_t("Add SuccessFully"));
            // onSuccess();
            // setFormValue({});
            // handleClose();
          } else {
            ShowError(resp.ErrorData);
          }
        });
    }
  };
  const body = () => {
    // if (flagProps === "delete") {
    //   return (
    //     <strong className="delete-text">
    //       {_t("do you want to delete the selected items ?")}
    //     </strong>
    //   );
    // } else {
    return (
      <FormValidate
        ref={formRef}
        formValue={formValue}
        setFormValue={setFormValue}
        layout="vertical"
        listItem={listFormItem}
      />
    );
  };

  return (
    <>
      <div style={{ width: "100%", background: "#f6f6f6" }}>
        <div
          style={{
            height: "60px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px 0 30px",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}>
          <div>
            <Link to={`/${NetWorkID}/StaffNew`} style={{ color: "gray" }}>
              Danh sách nhân viên
            </Link>
            <span style={{ margin: "0 10px 0 10px" }}>{">"}</span>
            <Link to={"/"} style={{ color: "black" }}>
              Thêm nhân viên
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Button
              style={{ background: "green", color: "white" }}
              onClick={handleSubmit}>
              Lưu
            </Button>
            <Button
              style={{ background: "green", color: "white" }}
              onClick={handleSubmit}>
              Lưu & Tạo mới
            </Button>
            <Link to={`/${NetWorkID}/StaffNew`}>
              <Button>Hủy</Button>
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "8px", background: "#fff" }}>
          <div>
            <InputUploadIMG />
          </div>
          <div>{body()}</div>
        </div>
      </div>
    </>
  );
}
