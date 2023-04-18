import TableLabor from "components/StafffNewDesign/TableLabor";
import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCheckEdit, setData, setDataUpdate } from "store/reducers/ui";
import StaffInforFamily from "../StaffInforFamily/StaffInforFamily";
import { Button, Input, Toggle } from "rsuite";
import FormValidate from "components/FormValidate/FormValidate";
import { Textarea } from "components/input/Textarea";
import { useLocalization } from "hooks/useLocalization";
import { AutoComplete, Checkbox, DatePicker, SelectPicker } from "rsuite";
import { dateRequiredRule, requiredRule } from "utils/validationRules";
import staff_service from "services/Staff/staff_service";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import useListOrg from "hooks/Select/useListOrg";
import useSelectListGender from "hooks/Select/useSelectListGender";
import useSelectListStaffType from "hooks/Select/useSelectListStaffType";
import { useListGovIDType } from "hooks/Select/useListGovIDType";
import { FormItemInterface } from "components/interface";
import { convertDate } from "utils/date";
import { v4 as uuid } from "uuid";
import MapListDepartmentItem from "components/StafffNewDesign/mapListDepartment/MapListDepartmentItem";

export default function StaffInforEdit() {
  const dataEdit = useSelector((state: any) => state.ui.data);
  const [data, setDataFull] = useState(dataEdit);
  const dispatch = useDispatch();
  const handleCancer = () => {
    dispatch(setCheckEdit(false));
  };
  const { staffCode } = useParams();
  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;
  const checkEdit = useSelector((state: any) => state.ui.checkEdit);
  const _l = useLocalization("Staff_Reward_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const listTypeID = useListGovIDType();
  const [updateDP, seUpdateDp] = useState([] as any);
  const dataIMG = useSelector((state: any) => state.ui.dataImg);
  const listOrg = useListOrg();
  const listGender = useSelectListGender();
  const staffType = useSelectListStaffType();
  const fetchData = async () => {
    const resp = await staff_service.getByStaffCode(staffCode as string);
    setDataFull(resp.Data.Staff_Staff);
    dispatch(setData(resp.Data));
    return resp;
  };
  useEffect(() => {
    fetchData();
  }, []);
  const listFormItem1: FormItemInterface[] = [
    {
      label: _l("Mã nhân viên"), // Mã nhân viên
      required: true,
      control: [
        {
          rule: requiredRule,
          disabled: true,
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
          rule: requiredRule,
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
          <MapListDepartmentItem
            item={updateDP}
            setDepartmentList={seUpdateDp}
            flag="update"
          />
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
          accepter: checkEdit ? Input : SelectPicker,
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
      required: true,
      Col: 11,
      control: [
        {
          name: "PermanentAddress",
          accepter: Textarea,
          placeholder: _p("Nhập"),
          rule: requiredRule,
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
          rule: dateRequiredRule,
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
          name: "DateOfIssue",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
          rule: dateRequiredRule,
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
          defaultChecked: data?.Staff_Staff?.FlagActive === "1" ? true : false,
          onChange: () => {
            setFormValue((p: any) => {
              return {
                ...p,
                FlagActive: formValue.FlagActive === "1" ? "0" : "1",
              };
            });
          },
          accepter: Toggle,
          checkedChildren: "Active",
          unCheckedChildren: "Inactive",
          customerFormItem: (
            <div
              style={{
                transform: "translateX(-150px)",
                border: "2px solid",
                display: "flex",
                alignItems: "center",
                padding: "6px 10px",
                borderRadius: "4px",
                color: "green",
                fontWeight: "700",
                cursor: "pointer",
              }}>
              Detail
            </div>
          ),
        },
      ],
    },
    {
      label: _l("Nơi cấp"),
      required: true,
      Col: 11,
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
        StaffCode: staffCode,
        StaffCodeUser: formValue.StaffCodeUser ? formValue.StaffCodeUser : "",
        Gender: formValue.Gender ? formValue.Gender : "",
        IDCardNumber: formValue.IDCardNumber ? formValue.IDCardNumber : "",
        PlaceOfIssue: formValue.PlaceOfIssue ? formValue.PlaceOfIssue : "",
        StaffName: formValue.StaffName ? formValue.StaffName : "",
        StaffLastName: formValue.StaffLastName ? formValue.StaffLastName : "",
        StaffAddress: formValue.StaffAddress ? formValue.StaffAddress : "",
        StaffPhone: formValue.StaffPhone ? formValue.StaffPhone : "",
        StaffEmail: formValue.StaffEmail ? formValue.StaffEmail : "",
        DBO: formValue.DBO ? convertDate(formValue.DBO) : "",
        DateOfIssue: formValue.DateOfIssue
          ? convertDate(formValue.DateOfIssue)
          : "",
        OrgID: NetWorkID,
        Remark: formValue.Remark ? formValue.Remark : "",
        WorkingEndDate: formValue.WorkingEndDate
          ? convertDate(formValue.WorkingEndDate)
          : "",
        WorkingStartDate: formValue.WorkingStartDate
          ? convertDate(formValue.WorkingStartDate)
          : "",
        BirthPlace: formValue.BirthPlace ? formValue.BirthPlace : "",
        UserID: formValue.UserID ? formValue.UserID : "",
        StaffType: formValue.StaffType ? formValue.StaffType : "",
        GovIDType: formValue?.GovIDType ? formValue?.GovIDType : "",
        PermanentAddress: formValue.PermanentAddress
          ? formValue.PermanentAddress
          : "",
        AvatarFilePath: dataIMG.FilePath
          ? dataIMG.FilePath
          : formValue.AvatarFilePath,
        AvatarUrl: dataIMG.Url ? dataIMG.Url : formValue.AvatarUrl,
        AvatarFileName: dataIMG.FileName
          ? dataIMG.FileName
          : formValue.AvatarUrl,
        AttFileId: dataIMG.AttFileId ? dataIMG.AttFileId : formValue.AttFileId,
        FlagFileUpload: dataIMG.FlagFileUpload
          ? dataIMG.FlagFileUpload
          : formValue.FlagFileUpload,
      };
      staff_service
        .update({
          isNew: false,
          data: {
            Staff_Staff: condition,
            Lst_Staff_MapDepartment:
              updateDP[0].DepartmentCode === null ||
              updateDP[0].PositionCode === null
                ? []
                : updateDP,
            Lst_Staff_InfoDynamicField: null,
          },
        })
        .then((resp: any) => {
          if (resp.Success) {
            toast.success(_t("Chỉnh sửa nhân viên thành công"));
            fetchData();
            dispatch(setCheckEdit(false));
            dispatch(setDataUpdate(resp));
          } else {
            ShowError(resp.ErrorData);
          }
        });
    }
  };

  const render = () => {
    setFormValue({
      StaffCodeUser: data?.Staff_Staff.StaffCodeUser,
      StaffName: data.Staff_Staff.StaffName,
      StaffLastName: data.Staff_Staff.StaffLastName,
      StaffAddress: data.Staff_Staff.StaffAddress,
      StaffPhone: data.Staff_Staff.StaffPhone,
      StaffEmail: data.Staff_Staff.StaffEmail,
      OrgID: NetWorkID,
      DBO: new Date(data.Staff_Staff.DBO),
      WorkingEndDate: new Date(data.Staff_Staff.WorkingEndDate),
      WorkingStartDate: new Date(data.Staff_Staff.WorkingStartDate),
      DateOfIssue: new Date(data.Staff_Staff.DateOfIssue),
      BirthPlace: data.Staff_Staff.BirthPlace,
      UserID: data.Staff_Staff.UserID,
      StaffType: data.Staff_Staff.StaffType,
      GovIDType: data.Staff_Staff.GovIDType,
      PermanentAddress: data.Staff_Staff.PermanentAddress,
      Remark: data.Staff_Staff.Remark,
      PlaceOfIssue: data.Staff_Staff.PlaceOfIssue,
      IDCardNumber: data.Staff_Staff.IDCardNumber,
      Gender: data.Staff_Staff.Gender,
      AvatarFilePath: data.Staff_Staff.AvatarFilePath,
      AvatarUrl: data.Staff_Staff.AvatarUrl,
      AvatarFileName: data.Staff_Staff.AvatarFileName,
      AttFileId: data.Staff_Staff.AttFileId,
      FlagFileUpload: data.Staff_Staff.AttFileId,
    });
  };

  useEffect(() => {
    render();
    if (data?.Staff_MapDepartment.length !== 0) {
      const newArr = data?.Staff_MapDepartment.map((item: any) => ({
        DepartmentCode: item.DepartmentCode,
        PositionCode: item.PositionCode,
      }));
      seUpdateDp(newArr);
    } else {
      seUpdateDp([
        {
          DepartmentCode: "",
          PositionCode: "",
        },
      ]);
    }
  }, [checkEdit]);
  const body = () => {
    return (
      <FormValidate
        ref={formRef}
        formValue={formValue}
        setFormValue={setFormValue}
        layout="vertical"
        listItem={listFormItem1}
      />
    );
  };
  return (
    <>
      {/* thông tin cá nhân */}
      <div
        style={{
          background: "white",
          marginTop: "8px",
          padding: "20px 30px 20px 30px",
        }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                height: "30px",
                width: "30px",
                background: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}>
              <FaUser style={{ color: "white" }} />
            </div>
            <span
              style={{ color: "black", fontWeight: "600", marginLeft: "15px" }}>
              Thông tin cá nhân
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                padding: "6px 15px",
                background: "green",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={handleSubmit}>
              Cập nhật
            </span>
            <span
              style={{
                padding: "6px 15px",
                background: "#eaf0f7",
                borderRadius: "4px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
              onClick={handleCancer}>
              Hủy
            </span>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>{body()}</div>
      </div>
      {/* thông tin gia đình */}
      <StaffInforFamily />
    </>
  );
}
