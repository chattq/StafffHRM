import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import TitleComponent from "components/CustomModal/TitleComponent";
import { useState, useEffect, FC, useRef } from "react";
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  InputNumber,
  Modal,
  SelectPicker,
  Toggle,
} from "rsuite";
import { useLocalization } from "hooks/useLocalization";
import FormValidate from "components/FormValidate/FormValidate";
import store from "store/store";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import { dateRequiredRule, requiredRule } from "utils/validationRules";
import staff_reward_service from "services/Staff/staff_reward_service";
import { Textarea } from "components/input/Textarea";
import useSelectListStaff from "hooks/Select/useSelectListStaff";
import { convertDate } from "utils/date";
import useListTypeReward from "hooks/Select/useListReward";
import staff_discipline_service from "services/Staff/staff_discipline_service";
import useSelectListDiscipline from "hooks/Select/useSelectListDiscipline";

type Props = {
  flag: string;
  code?: any;
  onSuccess: Function;
  uuid: string;
};

type FormValue = {
  StaffCode: string;
  Idx: string;
  OrgID: string;
  OrgName: string;
  BreachDay: Date;
  DisciplineReason: string;
  DisciplineCode: string;
  DecisionNumber: string;
  EffectiveDate: Date;
  ExpirationDate: Date;
  TotalDamage: string;
  FlagHighest: string;
  Remark: string;
};

type AutoCompleteType = {
  value: string;
  label: string;
};

const Staff_Discipline_Edit: FC<Props> = ({
  flag,
  code,
  onSuccess,
  uuid,
}: Props) => {
  const formRef: any = useRef(null);
  const _l = useLocalization("Staff_Discipline_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const selectListStaff = useSelectListStaff();
  const selectListDiscipline = useSelectListDiscipline();
  const [flagProps, setFlagProps] = useState<string>(flag);
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({} as FormValue);
  const handleClose = () => {
    setOpen(false);
  };

  const listStaff = selectListStaff.map((item: any) => {
    return {
      label: item.StaffFullName,
      value: item.StaffCode,
    };
  });

  const listFormItem: any[] = [
    {
      label: _l("DecisionNumber"), // số quyết định
      required: true,
      control: [
        {
          rule: requiredRule,
          plaintext: flagProps === "detail" ? true : false,
          name: "DecisionNumber",
          placeholder: _p("Input"),
        },
      ],
    },
    {
      label: _l("StaffName"), // Họ tên
      required: true,
      control: [
        {
          className: flagProps === "detail" ? "form-item-auto-complete" : "",
          disabled: flagProps === "update" ? true : false,
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
      label: _l("OrgName"), // số quyết định
      required: true,
      control: [
        {
          rule: requiredRule,
          plaintext: flagProps === "detail" ? true : false,
          name: "OrgName",
          placeholder: _p("Input"),
        },
      ],
    },
    {
      label: _l("BreachDay"), // số quyết định
      required: true,
      control: [
        {
          className: "w-5",
          rule: dateRequiredRule,
          oneTap: true,
          plaintext: flagProps === "detail" ? true : false,
          accepter: DatePicker,
          name: "BreachDay",
          placeholder: _p("Select Time"),
        },
      ],
    },
    {
      label: _l("DisciplineReason"), // Danh hiệu
      required: true,
      control: [
        {
          plaintext: flagProps === "detail" ? true : false,
          name: "DisciplineReason",
          placeholder: _p("Input"),
          rule: requiredRule,
        },
      ],
    },
    {
      label: _l("mdi_DisciplineName"), // Hình thức kỷ luật
      required: true,
      control: [
        {
          //AwardTypeCode
          accepter: SelectPicker,
          data: selectListDiscipline,
          valueKey: "DisciplineCode",
          labelKey: "DisciplineName",
          plaintext: flagProps === "detail" ? true : false,
          name: "mdi_DisciplineName",
          placeholder: _p("Input"),
          rule: requiredRule,
        },
      ],
    },
    {
      label: _l("EffectiveDate"), // Ngày kỷ luật
      required: true,
      control: [
        {
          accepter: DatePicker,
          plaintext: flagProps === "detail" ? true : false,
          name: "EffectiveDate",
          placeholder: _p("Select Date"),
          rule: dateRequiredRule,
          oneTap: true,
        },
        {
          accepter: DatePicker,
          oneTap: true,
          plaintext: flagProps === "detail" ? true : false,
          name: "ExpirationDate",
          placeholder: _p("Select Date"),
          rule: dateRequiredRule,
        },
      ],
    },
    {
      label: _l("TotalDamage"), // Tổng giá trị thiệt hại
      control: [
        {
          plaintext: flagProps === "detail" ? true : false,
          name: "TotalDamage",
          placeholder: _p("Input"),
          accepter: InputNumber,
        },
      ],
    },
    {
      label: _l(""), // Loại
      control: [
        {
          plaintext: flagProps === "detail" ? true : false,
          name: "FlagHighest",
          accepter: Checkbox,
          onChange: () => {
            setFormValue((p: any) => {
              return {
                ...p,
                FlagHighest: formValue.FlagHighest === "1" ? "0" : "1",
              };
            });
          },
          checked: formValue.FlagHighest === "1" ? true : false,
          children: (
            <>
              {formValue.FlagHighest === "1"
                ? _p("Là hình thức kỷ luật cao nhất")
                : ""}
            </>
          ),
        },
      ],
    },
  ];
  const handleSubmit = async () => {
    if (flagProps === "delete") {
      staff_discipline_service.removeMultiple(code).then((resp: any) => {
        if (resp.Success) {
          toast.success(_t("Delete success !"));
          onSuccess();
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
        let condition = {
          ...formValue,
          DisciplineCode: formValue.DisciplineCode
            ? formValue.DisciplineCode
            : "",
          OrgId: store.getState().orgInfo.OrgId,
          Remark: formValue.Remark ? formValue.Remark : "",
          Idx: formValue.Idx ? formValue.Idx : "0",
          BreachDay: convertDate(formValue.BreachDay),
          EffectiveDate: convertDate(formValue.EffectiveDate),
          ExpirationDate: convertDate(formValue.ExpirationDate),
        };

        if (flagProps === "add") {
          let Idx: any = 0;

          await staff_discipline_service
            .getByCode(formValue.StaffCode)
            .then((resp: any) => {
              if (resp.Success) {
                const data = resp.Data.Lst_Staff_Discipline;
                if (data && data.length) {
                  Idx = Math.max(
                    ...data.map((item: any) => {
                      return parseInt(item.Idx);
                    })
                  );
                }
              } else {
                ShowError(resp.ErrorData);
              }
            });

          condition = {
            ...condition,
            Idx: Idx + 1,
          };
          staff_discipline_service
            .update({
              isNew: true,
              data: condition,
            })
            .then((resp: any) => {
              if (resp.Success) {
                toast.success(_t("Add SuccessFully"));
                onSuccess();
              } else {
                ShowError(resp.ErrorData);
              }
            });
        }
        if (flagProps === "update") {
          staff_discipline_service
            .update({
              isNew: false,
              data: condition,
            })
            .then((resp: any) => {
              if (resp.Success) {
                toast.success(_t("Update SuccessFully"));
                onSuccess();
              } else {
                ShowError(resp.ErrorData);
              }
            });
        }
      }
    }
  };

  const body = () => {
    if (flagProps === "delete") {
      return (
        <strong className="delete-text">
          {_t("do you want to delete the selected items ?")}
        </strong>
      );
    } else {
      return (
        <FormValidate
          ref={formRef}
          formValue={formValue}
          setFormValue={setFormValue}
          layout="vertical"
          listItem={listFormItem}
        />
      );
    }
  };

  useEffect(() => {
    setFlagProps(flag);
  }, [uuid]);

  const render = () => {
    if (flag === "add") {
      setFormValue({} as FormValue);
    } else {
      const obj = {
        StaffName: code.ss_StaffFullName,
        ...code,
        BreachDay: new Date(code.BreachDay),
        EffectiveDate: new Date(code.EffectiveDate),
        ExpirationDate: new Date(code.ExpirationDate),
      };
      setFormValue(obj);
    }
  };

  useEffect(() => {
    render();
    setOpen(true);
    return () => {
      setFlagProps("detail");
      setFormValue({} as FormValue);
    };
  }, [uuid, flag]);

  const handleChangeView = () => {
    setFlagProps("update");
  };

  return (
    <Modal
      backdrop="static"
      className="modal-container"
      open={open}
      onClose={handleClose}
      size={flagProps === "delete" ? "sm" : "sm"}
    >
      <TitleComponent flag={flagProps} text={_l("Staff_Reward")} />
      <Modal.Body>{body()}</Modal.Body>
      <ModalFooterComponent
        onDelete={handleSubmit}
        onAdd={handleSubmit}
        onUpdate={handleSubmit}
        flag={flagProps}
        onChangeToUpdate={handleChangeView}
        onClose={handleClose}
      />
    </Modal>
  );
};

export default Staff_Discipline_Edit;
