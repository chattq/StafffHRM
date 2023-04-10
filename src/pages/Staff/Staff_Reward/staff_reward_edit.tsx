import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import TitleComponent from "components/CustomModal/TitleComponent";
import { useState, useEffect, FC, useRef } from "react";
import {
  AutoComplete,
  Checkbox,
  DatePicker,
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

type Props = {
  flag: string;
  code?: any;
  onSuccess: Function;
  uuid: string;
};

type FormValue = {
  StaffCode: string;
  Idx: string;
  OrgName: string;
  RewardDay: Date;
  Signification: string;
  AwardTypeCode: string;
  RewardReason: string;
  DecisionNumber: string;
  EffectiveDate: Date;
  Remark: string;
  FlagHighest: string;
};

type AutoCompleteType = {
  value: string;
  label: string;
};

const Staff_Reward_Edit: FC<Props> = ({
  flag,
  code,
  onSuccess,
  uuid,
}: Props) => {
  const formRef: any = useRef(null);
  const _l = useLocalization("Staff_Reward_Edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const selectListStaff = useSelectListStaff();
  const selectListReward = useListTypeReward();
  const [flagProps, setFlagProps] = useState<string>(flag);
  const [open, setOpen] = useState(false);
  const { NetworkId, OrgId } = store.getState().orgInfo;
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
      label: _l("StaffCode"), // số quyết định
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
      label: _l("RewardDay"), // số quyết định
      required: true,
      control: [
        {
          className: "w-5",
          rule: dateRequiredRule,
          oneTap: true,
          plaintext: flagProps === "detail" ? true : false,
          accepter: DatePicker,
          name: "RewardDay",
          placeholder: _p("Select Time"),
        },
      ],
    },
    {
      label: _l("Signification"), // Danh hiệu
      required: true,
      control: [
        {
          plaintext: flagProps === "detail" ? true : false,
          name: "Signification",
          placeholder: _p("Input"),
          rule: requiredRule,
        },
      ],
    },
    {
      label: _l("AwardTypeCode"), // Loại
      required: true,
      control: [
        {
          //AwardTypeCode
          accepter: SelectPicker,
          data: selectListReward,
          valueKey: "AwardTypeCode",
          labelKey: "AwardTypeName",
          plaintext: flagProps === "detail" ? true : false,
          name: "AwardTypeCode",
          placeholder: _p("Input"),
          searchable: false,
          rule: requiredRule,
        },
      ],
    },
    {
      label: _l("RewardReason"), // Lý do
      control: [
        {
          accepter: Textarea,
          plaintext: flagProps === "detail" ? true : false,
          name: "RewardReason",
          placeholder: _p("Input"),
        },
      ],
    },
    {
      label: _l("EffectiveDate"), // Loại
      required: true,
      control: [
        {
          className: "w-5",
          rule: dateRequiredRule,
          oneTap: true,
          plaintext: flagProps === "detail" ? true : false,
          name: "EffectiveDate",
          accepter: DatePicker,
          placeholder: _p("Select Time"),
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
                ? _p("Là khen thưởng cao nhất")
                : ""}
            </>
          ),
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (flagProps === "delete") {
      staff_reward_service.removeMultiple(code).then((resp: any) => {
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
        const condition = {
          ...formValue,
          Remark: formValue.Remark ? formValue.Remark : "",
          Idx: formValue.Idx ? formValue.Idx : "0",
          EffectiveDate: convertDate(formValue.EffectiveDate),
          RewardDay: convertDate(formValue.RewardDay),
        };

        if (flagProps === "add") {
          staff_reward_service
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
          staff_reward_service
            .update({
              isNew: false,
              data: condition,
            })
            .then((resp: any) => {
              console.log("resp", resp);
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
      setFormValue(() => {
        return {
          StaffName: code.ss_StaffFullName,
          ...code,
          RewardDay: new Date(code.RewardDay),
          EffectiveDate: new Date(code.EffectiveDate),
        };
      });
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
      size={flagProps === "delete" ? "sm" : "sm"}>
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

export default Staff_Reward_Edit;
