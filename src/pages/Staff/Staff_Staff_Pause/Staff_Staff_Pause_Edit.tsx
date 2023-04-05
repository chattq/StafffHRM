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
import position_service from "services/Admin/position_service";
import { Textarea } from "components/input/Textarea";
import useSelectListStaff from "hooks/Select/useSelectListStaff";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import useSelectListResignReason from "hooks/Select/useSelectListResignReason";
import staff_service from "services/Staff/staff_service";
import { convertDate } from "utils/date";
import { dateRequiredRule } from "utils/validationRules";
import { log } from "console";

type Props = {
  flag: string;
  code?: any;
  onSuccess: Function;
  uuid: string;
};
const Staff_Staff_Pause_Edit: FC<Props> = ({
  flag,
  code,
  onSuccess,
  uuid,
}: Props) => {
  const formRef: any = useRef(null);
  const _l = useLocalization("Staff_Staff_Pause_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [flagProps, setFlagProps] = useState<string>(flag);
  const [open, setOpen] = useState(false);
  const { NetworkId, OrgId } = store.getState().orgInfo;
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
      required: flagProps === "pause" ? true : false,
      control: [
        {
          className: flagProps === "detail" ? "form-item-auto-complete" : "",
          disabled: flagProps === "update" ? true : false,
          rule: flagProps === "pause" ? requiredRule : null,
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
          plaintext: flagProps === "detail" ? true : false,
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
          plaintext: flagProps === "detail" ? true : false,
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
      label: _l("HistDate"), // Mã nhân viên
      hideSeparate: true,
      required: flagProps === "pause" ? true : false,
      control: [
        {
          rule: flagProps === "pause" ? dateRequiredRule : false,
          disabled: flagProps === "rework" ? true : false,
          name: "HistDate",
          placeholder: _p("Input"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },
    {
      label: _l("ReasonID"), // Mã nhân viên
      required: flagProps === "pause" ? true : false,
      control: [
        {
          rule: flagProps === "pause" ? requiredRule : null,
          name: "ReasonID",
          valueKey: "ReasonID",
          labelKey: "ResignReason",
          accepter: SelectPicker,
          data: selectListResignReason,
          placeholder: _p("Select"),
        },
      ],
    },
    {
      label: _l("BackDay"), // Ngày đi làm lại
      control: [
        {
          disabled: flagProps === "rework" ? true : false,
          name: "BackDay",
          accepter: DatePicker,
          placeholder: _p("Date"),
          className: "w-5",
        },
      ],
    },
    {
      label: _l("NewBackDay"), // Ngày đi làm lại mới
      isHidden: flagProps === "rework" ? false : true,
      required: flagProps === "pause" ? false : true, //
      control: [
        {
          name: "NewBackDay",
          accepter: DatePicker,
          data: selectListResignReason,
          placeholder: _p("Date"),
          className: "w-5",
          rule: flagProps !== "pause" ? dateRequiredRule : null,
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
        DepartmentCode: formValue.DepartmentCode
          ? formValue.DepartmentCode
          : "",
        HistDate: formValue.HistDate ? convertDate(formValue.HistDate) : "",
        BackDay:
          flagProps === "rework"
            ? formValue.NewBackDay
              ? convertDate(formValue.NewBackDay)
              : ""
            : formValue.BackDay
            ? convertDate(formValue.BackDay)
            : "",
      };

      if (flagProps === "pause") {
        staff_service.addPauseStaff(condition).then((resp: any) => {
          if (resp.Success) {
            toast.success(_t("Add SuccessFully"));
            onSuccess();
            handleClose();
          } else {
            ShowError(resp.ErrorData);
          }
        });
      }
      if (flagProps === "rework") {
        staff_service.addActiveStaff(condition).then((resp: any) => {
          if (resp.Success) {
            console.log("condition ", condition);
            toast.success(_t("Rework SuccessFully"));
            onSuccess();
            handleClose();
          } else {
            ShowError(resp.ErrorData);
          }
        });
      }
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

  const render = () => {
    if (flag === "pause") {
      setFormValue({});
    } else {
      setFormValue((p: any) => {
        return {
          ...code,
          HistDate: code.HistDate === null ? null : new Date(code.HistDate),
          BackDay: code.BackDay === null ? null : new Date(code.BackDay),
        };
      });
    }
  };

  useEffect(() => {
    render();
    setOpen(true);
    if (flag === "pause") {
      console.log("flag item", flag);
      setFormValue((p: any) => {
        return {
          HistDate: new Date(Date.now()),
        };
      });
    }

    return () => {
      setFormValue({});
    };
  }, [uuid, flag]);

  return (
    <Modal
      backdrop="static"
      className="modal-container"
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Modal.Title>
          {flagProps === "rework" ? _l("Rework") : _l("Pause")}
        </Modal.Title>
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

export default Staff_Staff_Pause_Edit;
