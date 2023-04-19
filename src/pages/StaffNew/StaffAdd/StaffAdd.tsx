import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Toggle } from "rsuite";
import FormValidate from "components/FormValidate/FormValidate";
import InputUploadIMG from "components/StafffNewDesign/InputUploadIMG";
import { Textarea } from "components/input/Textarea";
import { useLocalization } from "hooks/useLocalization";
import { useMemo, useRef, useState } from "react";
import { AutoComplete, Checkbox, DatePicker, SelectPicker } from "rsuite";
import { dateRequiredRule, requiredRule } from "utils/validationRules";
import { StaffAddType } from "components/StafffNewDesign/TypeStaff";
import staff_service from "services/Staff/staff_service";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import useListOrg from "hooks/Select/useListOrg";
import useSelectListGender from "hooks/Select/useSelectListGender";
import useSelectListStaffType from "hooks/Select/useSelectListStaffType";
import { useListGovIDType } from "hooks/Select/useListGovIDType";
import { FormItemInterface } from "components/interface";
import { useSelector } from "react-redux";
import MapListDepartmentItem from "components/StafffNewDesign/mapListDepartment/MapListDepartmentItem";

type Props = {
  flag?: string;
  code?: any;
  onSuccess?: Function;
};

type Img = {
  Url?: string;
  FilePath?: string;
  AttFileId: string;
  FileName: string;
  FlagFileUpload: string;
};

export default function StaffAdd({ flag, code, onSuccess }: Props) {
  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const _l = useLocalization("Staff_Reward_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as StaffAddType);
  const listTypeID = useListGovIDType();
  const [imgAPI, setIMGApi] = useState<Img>();
  const listOrg = useListOrg();
  const listGender = useSelectListGender();
  const staffType = useSelectListStaffType();
  const nav = useNavigate();
  const [DP, setDP] = useState([] as any);

  const listFormItem: FormItemInterface[] = [
    {
      label: _l("Mã nhân viên"), // Mã nhân viên
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "StaffCodeUser",
          placeholder: _p("Nhập"),
        },
      ],
      Col: 11,
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
      label: _l("Họ và tên"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          name: "StaffLastName",
          rule: requiredRule,
          placeholder: _p("Họ"),
          className: "w-5",
        },
        {
          name: "StaffName",
          rule: requiredRule,
          placeholder: _p("Tên"),
          className: "w-5",
        },
      ],
    },
    {
      label: _l("Email"), // Họ tên
      Col: 11,
      control: [
        {
          name: "StaffEmail",
          placeholder: _p("Nhập"),
        },
      ],
    },

    {
      label: _l("Loại"), // Họ tên
      required: true,
      Col: 11,
      control: [
        {
          rule: requiredRule,
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
      label: _l("Địa chỉ hiện tại"), // Họ tên
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
      label: _l("Phòng ban"),
      required: true,
      Col: 11,
      customComponent: (
        <div>
          <MapListDepartmentItem setDepartmentList={setDP} flag="create" />
        </div>
      ),
    },
    {
      label: _l("DOB"), // Th
      Col: 11,
      control: [
        {
          name: "DBO",
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
      label: _l("Giới tính"), // Họ tên
      Col: 11,
      control: [
        {
          name: "Gender",
          accepter: SelectPicker,
          data: listGender,
          labelKey: "GenderCode",
          valueKey: "GenderCode",
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
          placeholder: checkEdit ? "" : _p("Chọn"),
          labelKey: "mnnt_NNTFullName",
          valueKey: "mnnt_NNTFullName",
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
      label: _l("Địa chỉ thường trú"), // Họ tên
      Col: 11,
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "PermanentAddress",
          accepter: Textarea,
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Bắt đầu"), // Th
      required: true,
      Col: 11,
      control: [
        {
          rule: dateRequiredRule,
          name: "WorkingStartDate",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Số giấy tờ"), // kinh nghiệm làm việc
      required: true,
      Col: 11,
      control: [
        {
          name: "IDCardNumber",
          placeholder: _p("Nhập"),
          className: "w-5",
          rule: requiredRule,
        },
        {
          name: "GovIDType",
          data: listTypeID,
          accepter: SelectPicker,
          placeholder: _p("Loại giấy tờ"),
          labelKey: "GovIDTypeName",
          valueKey: "GovIDType",
          className: "w-5",
          rule: requiredRule,
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
      label: _l("Ngày cấp"), // Th
      required: true,
      Col: 11,
      control: [
        {
          rule: dateRequiredRule,
          name: "DateOfIssue",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Trạng thái"),
      Col: 11,
      control: [
        {
          name: "FlagActive",
          placeholder: _p("Nhập"),
          defaultChecked: true,
          onChange: () => {
            setFormValue((p: any) => {
              return {
                ...p,
                FlagActive: formValue.FlagActive === "0" ? "1" : "0",
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
      label: _l("Nơi cấp"), // kinh nghiệm làm việc
      Col: 11,
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "PlaceOfIssue",
          placeholder: _p("Nhập"),
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
          StaffName: formValue.StaffName ? formValue.StaffName : "",
          StaffLastName: formValue.StaffLastName ? formValue.StaffLastName : "",
          StaffEmail: formValue.StaffEmail ? formValue.StaffEmail : "",
          StaffAddress: formValue.StaffAddress ? formValue.StaffAddress : "",
          StaffPhone: formValue.StaffPhone ? formValue.StaffPhone : "",
          Gender: formValue.Gender ? formValue.Gender : "",
          PlaceOfIssue: formValue.Gender ? formValue.PlaceOfIssue : "",
          OrgID: NetWorkID,
          IDCardNumber: formValue.IDCardNumber ? formValue.IDCardNumber : "",
          DBO: formValue.DBO ? formValue.DBO : "",
          Remark: formValue.Remark ? formValue.Remark : "",
          WorkingEndDate: new Date(formValue.WorkingEndDate),
          WorkingStartDate: new Date(formValue.WorkingStartDate),
          DateOfIssue: new Date(formValue.DateOfIssue),
          BirthPlace: formValue.BirthPlace ? formValue.BirthPlace : "",
          UserID: formValue.UserID ? formValue.UserID : "",
          StaffType: formValue.StaffType ? formValue.StaffType : "",
          GovIDType: formValue.GovIDType ? formValue.GovIDType : "",
          PermanentAddress: formValue.PermanentAddress
            ? formValue.PermanentAddress
            : "",
          AvatarFilePath: imgAPI?.FilePath ? imgAPI.FilePath : "",
          AvatarUrl: imgAPI?.Url ? imgAPI.Url : "",
          AvatarFileName: imgAPI?.FileName ? imgAPI.FileName : "",
          AttFileId: imgAPI?.AttFileId ? imgAPI.AttFileId : "",
          FlagFileUpload: imgAPI?.FlagFileUpload ? imgAPI?.FlagFileUpload : "",
          FlagActive: formValue.FlagActive ? formValue.FlagActive : "1",
          StaffStatus: formValue.FlagActive === "0" ? "PAUSE" : "ACTIVE",
        },
        Lst_Staff_MapDepartment:
          DP[0].DepartmentCode === null || DP[0].PositionCode === null
            ? []
            : DP,
      };
      staff_service
        .update({ isNew: true, data: condition })
        .then((resp: any) => {
          if (resp.Success) {
            toast.success(_t("Add SuccessFully"));
            nav(`/StaffNew/${resp.Data?.StaffCode}/chitiet`);
          } else {
            ShowError(resp.ErrorData);
          }
        });
    }
  };
  const body = () => {
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
        <div
          style={{
            display: "flex",
            marginTop: "8px",
            background: "#fff",
            paddingTop: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}>
          <div style={{ paddingRight: "40px" }}>
            <InputUploadIMG setIMGApi={setIMGApi} />
          </div>
          <div>{body()}</div>
        </div>
      </div>
    </>
  );
}
