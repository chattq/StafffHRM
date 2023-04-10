import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import { ShowError } from "components/Dialogs/Dialogs";
import FormValidate from "components/FormValidate/FormValidate";
import { Textarea } from "components/input/Textarea";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import useSelectListResignReason from "hooks/Select/useSelectListResignReason";
import useSelectListStaff from "hooks/Select/useSelectListStaff";
import { useLocalization } from "hooks/useLocalization";
import React, { memo, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, DatePicker } from "rsuite";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";

export default function ModalStaffEdit({
  button,
  onSuccess,
}: {
  button: any;
  onSuccess: any;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const formRef: any = useRef(null);
  const _l = useLocalization("ModalStaffEdit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [formValue, setFormValue] = useState({} as any);
  const selectListStaff = useSelectListStaff();
  const selectListDepartment = useSelectListDepartment();
  const selectListPosition = useSelectListPosition();
  const selectListResignReason = useSelectListResignReason();

  const listStaff = selectListStaff.map((item: any) => {
    return {
      label: item.StaffFullName,
      value: item.StaffCode,
      department: item.DepartmentCode,
      position: item.PositionCode,
    };
  });

  const listFormItem: any[] = [
    {
      label: _l("Thời gian"), // Tổ chức
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
      label: _l("Công ty"), // Mã nhân viên
      required: true,
      control: [
        {
          name: "Company",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Vị trí"), // Mã nhân viên
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
      label: _l("Kinh nghiệm làm việc"), // Mã nhân viên
      control: [
        {
          rule: requiredRule,
          name: "WorkExperience",
          accepter: Textarea,
          placeholder: _p("Nhập"),
        },
      ],
    },
  ];
  const { staffCode } = useParams();

  const handleSubmit = () => {
    if (!formRef.current.check || !formRef.current) {
      return;
    }
    if (!formRef.current.check()) {
      return;
      //   "StaffCode": "STAFF.C3C.00216",
    } else {
      const condition = {
        StaffCode: staffCode,
        DateForm: formValue.DateForm ? convertDate(formValue.DateForm) : "",
        Company: formValue.Company ? formValue.Company : "",
        Position: formValue.Position ? formValue.Position : "",
        WorkExperience: formValue.WorkExperience
          ? formValue.WorkExperience
          : "",
        DateTo: formValue.DateTo ? convertDate(formValue.DateTo) : "",
      };

      console.log("condition ", condition);

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

  //   useEffect(() => {
  //     setOpen(false);
  //     return () => {
  //       setFormValue({});
  //     };
  //   }, [uuid]);

  return (
    <>
      <span onClick={handleOpen}>{button}</span>
      <Modal keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>{body()}</Modal.Body>

        <ModalFooterComponent
          onUpdate={handleSubmit}
          onDelete={handleSubmit}
          flag="update"
          onClose={handleClose}
        />
      </Modal>
    </>
  );
}
