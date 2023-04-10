import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import TitleComponent from "components/CustomModal/TitleComponent";
import { useState, useEffect, FC, useRef } from "react";
import { AutoComplete, Modal, SelectPicker, Toggle, DatePicker } from "rsuite";
import { useLocalization } from "hooks/useLocalization";
import { FormItemInterface } from "components/interface";
import FormValidate from "components/FormValidate/FormValidate";
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import department_service from "services/Admin/department_service";
import store from "store/store";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import useListOrg from "hooks/Select/useListOrg";
import ResignReason_service from "services/Admin/ResignReason_service";
import { requiredRule } from "utils/validationRules";
import useSelectListStaff from "hooks/Select/useSelectListStaff";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import useSelectListResignReason from "hooks/Select/useSelectListResignReason";
import staff_service from "services/Staff/staff_service";
import { convertDate } from "utils/date";
import { dateRequiredRule } from "utils/validationRules";

type Props = {
  onSuccess: Function;
  uuid: string;
};
const Staff_Staff_Inactive_Edit: FC<Props> = ({ onSuccess, uuid }: Props) => {
  const formRef: any = useRef(null);
  const _l = useLocalization("Staff_Staff_Inactive_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [open, setOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  const listFormItem: any[] = [
    {
      label: _l("StaffName"), // Tổ chức
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "StaffName",
          data: listStaff,
          accepter: AutoComplete,
          placeholder: _p("select"),
          onSelect: (item: any, event: any) => {
            setTimeout(() => {
              setFormValue((p: any) => {
                return {
                  ...p,
                  StaffName: event.label,
                  StaffCode: event.value,
                  DepartmentCode: event.department,
                  PositionCode: event.position,
                };
              });
            }, 0);
          },
        },
      ],
    },
    {
      label: _l("StaffCode"), // Mã nhân viên
      control: [
        {
          disabled: true,
          name: "StaffCode",
          placeholder: _p("Input"),
        },
      ],
    },
    {
      label: _l("PositionName"), // Mã nhân viên
      control: [
        {
          disabled: true,
          name: "PositionCode",
          placeholder: _p("Input"),
          accepter: SelectPicker,
          data: selectListPosition,
          labelKey: "PositionName",
          valueKey: "PositionCode",
        },
        {
          disabled: true,
          name: "DepartmentCode",
          placeholder: _p("Select"),
          accepter: SelectPicker,
          data: selectListDepartment,
          labelKey: "DepartmentName",
          valueKey: "DepartmentCode",
        },
      ],
    },
    {
      label: _l("HistDate"), // Ngày nghỉ
      hideSeparate: true,
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "HistDate",
          placeholder: _p("Input"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },
    {
      label: _l("ReasonID"), // Mã nhân viên
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "ReasonID",
          valueKey: "ReasonID",
          labelKey: "ResignReason",
          accepter: SelectPicker,
          data: selectListResignReason,
          placeholder: _p("Select"),
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
        StaffCode: formValue.StaffCode ? formValue.StaffCode : "",
        PositionCode: formValue.PositionCode ? formValue.PositionCode : "",
        ReasonDesc: formValue.ReasonDesc ? formValue.ReasonDesc : "",
        ReasonID: formValue.ReasonID ? formValue.ReasonID : "",
        DepartmentCode: formValue.DepartmentCode
          ? formValue.DepartmentCode
          : "",
        HistDate: formValue.HistDate ? convertDate(formValue.HistDate) : "",
      };

      staff_service.addInactiveStaff(condition).then((resp: any) => {
        if (resp.Success) {
          toast.success(_t("Add SuccessFully"));
          onSuccess();
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

  useEffect(() => {
    setOpen(true);
    return () => {
      setFormValue({});
    };
  }, [uuid]);

  return (
    <Modal
      backdrop="static"
      className="modal-container"
      open={open}
      onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{_l("Inactive")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body()}</Modal.Body>
      <ModalFooterComponent
        onUpdate={handleSubmit}
        flag="update"
        onClose={handleClose}
      />
    </Modal>
  );
};

export default Staff_Staff_Inactive_Edit;
