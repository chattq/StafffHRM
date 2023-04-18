import { ShowError } from "components/Dialogs/Dialogs";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import UploadFileStaff from "components/StafffNewDesign/UploadFileStaff";
import { Textarea } from "components/input/Textarea";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, Uploader } from "rsuite";
import Staff_Appoint_service from "services/Staff/Staff_Appoint_service";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";

export default function StaffAppointEdit({
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
  const [fileContract, setFileContract] = useState("" as any);
  const [fileLaborUpdate, setFileLaborUpdate] = useState("" as any);
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
      label: _l("Ngày điều động/bổ nhiệm"), // ngày điều động bổ nhiệm
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "AppointDate",
          placeholder: _p("Nhập ngày"),
          accepter: DatePicker,
        },
      ],
    },
    {
      label: _l("Phòng ban"), // phòng ban
      required: true,
      control: [
        {
          name: "md_DepartmentName",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Chức danh"), // chức danh
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "ApprovalPosition",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Số quyết định"), // số quyết dịnh
      control: [
        {
          name: "DecisionNo",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Số tham chiếu"), // số tham chiếu
      control: [
        {
          name: "RefNo",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Ghi chú"), // kinh nghiệm làm việc
      control: [
        {
          name: "Remark",
          placeholder: _p("Nhập"),
          accepter: Textarea,
        },
      ],
    },
    {
      label: _l("Upload"), // kinh nghiệm làm việc
      customComponent: (
        <div style={{ width: 300 }}>
          <UploadFileStaff
            setFileContract={setFileContract}
            fileLaborUpdate={fileLaborUpdate}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    if (flag === "delete") {
      Staff_Appoint_service.Delete(data.StaffAppointCodeSys).then(
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
          StaffCode: staffCode ? staffCode : "",
          Idx: formValue.Idx ? formValue.Idx : "",
          AppointDate: formValue.AppointDate
            ? convertDate(formValue.AppointDate)
            : "",
          DecisionNo: formValue.DecisionNo ? formValue.DecisionNo : "",
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
