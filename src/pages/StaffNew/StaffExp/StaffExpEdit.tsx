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

export default function StaffExpEdit({
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
      label: _l("Thời gian"), // Th
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "DateForm",
          placeholder: _p("Từ ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
        {
          rule: dateRequiredRule,
          name: "DateTo",
          placeholder: _p("Đến ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },
    {
      label: _l("Công ty"), // công ty
      required: true,
      control: [
        {
          name: "Company",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Vị trí"), // vị trí
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "Position",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Kinh nghiệm làm việc"), // kinh nghiệm làm việc
      control: [
        {
          name: "WorkExperience",
          accepter: Textarea,
          placeholder: _p("Nhập"),
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (flag === "delete") {
      Staff_WorkExperience_service.Remove({
        StaffCode: data.StaffCode,
        Idx: data.Idx,
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
          StaffCode: staffCode ? staffCode : "",
          Idx: formValue.Idx ? formValue.Idx : "",
          DateForm: formValue.DateForm ? convertDate(formValue.DateForm) : "",
          Company: formValue.Company ? formValue.Company : "",
          Position: formValue.Position ? formValue.Position : "",
          WorkExperience: formValue.WorkExperience
            ? formValue.WorkExperience
            : "",
          DateTo: convertDate(formValue.DateTo)
            ? convertDate(formValue.DateTo)
            : "",
        };

        if (flagProps === "update") {
          Staff_WorkExperience_service.Create(condition).then((resp: any) => {
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
          console.log(condition);
          Staff_WorkExperience_service.Update(condition).then((resp: any) => {
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
        StaffCode: staffCode,
        Idx: data.Idx,
        DateForm: new Date(data.DateForm),
        DateTo: new Date(data.DateTo),
        Company: data.Company,
        Position: data.Position,
        WorkExperience: data.WorkExperience,
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
