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
  TagPicker,
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
import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectTrainType from "hooks/Select/useSelectTrainType";
import useSelectListRank from "hooks/Select/useSelectListRank";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";
import { useNavigate } from "react-router-dom";

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

const ManagerCourseEdit: FC<Props> = ({
  flag,
  code,
  onSuccess,
  uuid,
}: Props) => {
  const formRef: any = useRef(null);
  const _l = useLocalization("Manager_Course_edit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const listRank = useSelectListRank();
  const listDeparment = useSelectListDepartment();
  const listTrain = useSelectTrainType();
  const nav = useNavigate();
  const [flagProps, setFlagProps] = useState<string>(flag);
  const [open, setOpen] = useState(false);
  const { NetworkId, OrgId } = store.getState().orgInfo;
  const [formValue, setFormValue] = useState({} as any);
  const handleClose = () => {
    setOpen(false);
  };
  const listFormItem: any[] = [
    {
      label: _l("Tên khóa"), // số quyết định
      required: true,
      control: [
        {
          rule: requiredRule,
          name: "TrCsName",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Phòng ban"), // Họ tên
      control: [
        {
          name: "DepartmentCode",
          data: listDeparment,
          accepter: TagPicker,
          placeholder: _p("Chọn"),
          labelKey: "DepartmentName",
          valueKey: "DepartmentCode",
        },
      ],
    },
    {
      label: _l("Rank"), // số quyết định
      control: [
        {
          name: "RankCode",
          accepter: TagPicker,
          data: listRank,
          placeholder: _p("Chọn"),
          labelKey: "RankDesc",
          valueKey: "RankCode",
        },
      ],
    },
    {
      label: _l("Mô tả"), // số quyết định
      control: [
        {
          name: "TrCsDesc",
          placeholder: _p("Nhập"),
          accepter: Textarea,
        },
      ],
    },
    {
      label: _l("Loại"), // số quyết định
      control: [
        {
          accepter: SelectPicker,
          name: "TrainType",
          placeholder: _p("Chọn"),
          data: listTrain,
          labelKey: "TrainTypeName",
          valueKey: "TrainType",
        },
      ],
    },
    {
      label: _l("Test Pass"), // Danh hiệu
      control: [
        {
          accepter: InputNumber,
          name: "PassPercent",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Trạng thái"), // Loại
      control: [
        {
          name: "TrCsStatus",
          placeholder: _p("Nhập"),
          defaultChecked: true,
          onChange: () => {
            setFormValue((p: any) => {
              return {
                ...p,
                TrCsStatus:
                  formValue.TrCsStatus === "REJECT" ? "PENDING" : "REJECT",
              };
            });
          },
          accepter: Toggle,
          checkedChildren: "Active",
          unCheckedChildren: "Inactive",
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
          TrCsName: formValue.TrCsName ? formValue.TrCsName : "",
          PassPercent: formValue.PassPercent ? formValue.PassPercent : "",
          TrainType: formValue.TrainType ? formValue.TrainType : "",
          FlagAllDepartment: "0",
          FlagAllRank: "0",
          TrCsDesc: formValue.TrCsDesc ? formValue.TrCsDesc : "",
          TrCsStatus: formValue.TrCsStatus ? formValue.TrCsStatus : "PENDING",
        };
        if (flagProps === "add") {
          Train_Course_service.update({
            isNew: true,
            data: {
              Train_Course: condition,
              Lst_Train_CourseDepartment: formValue.DepartmentCode.map(
                (value: any) => {
                  return { DepartmentCode: value };
                }
              ),
              Lst_Train_CourseRank: formValue.RankCode.map((value: any) => {
                return { RankCode: value };
              }),
            },
          }).then((resp: any) => {
            if (resp.Success) {
              toast.success(_t("Add SuccessFully"));
              setFormValue({});
              onSuccess();
              setOpen(false);
              nav(`/${NetworkId}/Course/${resp.Data.TrCsCodeSys}`);
            } else {
              ShowError(resp.ErrorData);
            }
          });
        }
        // if (flagProps === "update") {
        //   staff_reward_service
        //     .update({
        //       isNew: false,
        //       data: condition,
        //     })
        //     .then((resp: any) => {
        //       console.log("resp", resp);
        //       if (resp.Success) {
        //         toast.success(_t("Update SuccessFully"));
        //         onSuccess();
        //       } else {
        //         ShowError(resp.ErrorData);
        //       }
        //     });
        // }
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
      <TitleComponent flag={""} text={_l("Thêm khóa học mới")} />
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

export default ManagerCourseEdit;
