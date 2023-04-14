import { ShowError } from "components/Dialogs/Dialogs";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import { Textarea } from "components/input/Textarea";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker } from "rsuite";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";
import Mst_RelativeInfo_service from "services/Staff/Mst_RelativeInfo_service";

export default function StaffInforFamilyEdit({
  button,
  onSuccess,
  data,
  flag,
  uuid,
}: {
  button?: any;
  onSuccess?: any;
  data?: any;
  flag?: string;
  uuid?: string;
}) {
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const [flagProps, setFlagProps] = useState(flag);
  const _l = useLocalization("ModalStaffEdit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [open, setOpen] = useState(false);
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
  const { staffCode } = useParams();
  const listFormItem: any[] = [
    {
      label: _l("Quan hệ"), // công ty
      required: true,
      control: [
        {
          name: "Relationship",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Họ và tên"), // vị trí
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "FullName",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Ngày sinh"), // Th
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "DateOfBirth",
          placeholder: _p("Từ ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },

    {
      label: _l("Nghề nghiệp"), // vị trí

      control: [
        {
          name: "Career",
          placeholder: _p("Nhập"),
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (flag === "delete") {
      Mst_RelativeInfo_service.Remove({
        StaffCode: data.StaffCode,
        RelativeInfoID: data.RelativeInfoID,
        OrgID: data.OrgID,
      }).then((resp: any) => {
        if (resp.Success) {
          toast.success(_t("Delete success !"));
          onSuccess();
          handleClose();
        } else {
          ShowError(resp.ErrorData);
        }
      });
    } else {
      if (!formRef.current.check || !formRef.current) {
        return;
      }
      if (!formRef.current.check()) {
        return;
      } else {
        const condition = {
          StaffCode: staffCode,
          OrgID: formValue.OrgID ? formValue.OrgID : "",
          RelativeInfoID: formValue.RelativeInfoID
            ? formValue.RelativeInfoID
            : "",
          RelativeType: formValue.RelativeType
            ? formValue.RelativeType
            : "EMPLOYEERELATION",
          FullName: formValue.FullName ? formValue.FullName : "",
          Relationship: formValue.Relationship ? formValue.Relationship : "",
          DateOfBirth: formValue.DateOfBirth
            ? new Date(formValue.DateOfBirth)
            : "",
          Career: formValue.Career ? formValue.Career : "",
          FlagDependent: formValue.FlagDependent ? formValue.FlagDependent : "",
          DateStart: formValue.DateStart ? new Date(formValue.DateStart) : "",
          DateEnd: formValue.DateEnd ? new Date(formValue.DateEnd) : "",
          Remark: formValue.Remark ? formValue.Remark : "",
        };

        if (flagProps === "update") {
          Mst_RelativeInfo_service.Create(condition).then((resp: any) => {
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
          Mst_RelativeInfo_service.Update(condition).then((resp: any) => {
            if (resp.Success) {
              toast.success(_t("Update SuccessFully"));
              onSuccess();
              handleClose();
            } else {
              ShowError(resp.ErrorData);
            }
          });
        }
      }
    }
  };

  const render = () => {
    if (flag === "detail") {
      setFormValue({
        RelativeInfoID: data.RelativeInfoID,
        OrgID: data.OrgID,
        RelativeType: data.RelativeType,
        StaffCode: staffCode,
        FullName: data.FullName,
        Relationship: data.Relationship,
        DateOfBirth: new Date(data.DateOfBirth),
        Career: data.Career,
        FlagDependent: "",
        DateStart: "",
        DateEnd: "",
        Remark: "",
      });
    }
  };
  useEffect(() => {
    render();
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
