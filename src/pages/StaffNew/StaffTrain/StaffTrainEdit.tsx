import { ShowError } from "components/Dialogs/Dialogs";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import { Textarea } from "components/input/Textarea";
import useSelectListRank from "hooks/Select/useSelectListRank";
import useSelectListStaffType from "hooks/Select/useSelectListStaffType";
import useSelectTrainType from "hooks/Select/useSelectTrainType";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, SelectPicker, Uploader } from "rsuite";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";
import Staff_Appoint_service from "services/Staff/Staff_Appoint_service";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";

export default function StaffTrainEdit({
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
  const listTrainStaff = useSelectTrainType();

  const listTrainRank = useSelectListRank();
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
      label: _l("Từ ngày"), // Th
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "LearnStartDTimeUTC",
          placeholder: _p("Từ ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
        {
          rule: dateRequiredRule,
          name: "LearnEndDTimeUTC",
          placeholder: _p("Đến ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },
    {
      label: _l("Tên Khóa"), // phòng ban
      required: true,
      control: [
        {
          data: listTrainStaff,
          name: "TrCsName",
          placeholder: _p("Nhập"),
          accepter: SelectPicker,
          labelKey: "TrainTypeName",
          valueKey: "TrainTypeName",
        },
      ],
    },
    {
      label: _l("Loại"), // loại hình đào tạo
      control: [
        {
          rule: requiredRule,
          name: "TrainType",
          placeholder: _p("Nhập"),
          accepter: SelectPicker,
          data: listTrainStaff,
          labelKey: "TrainType",
          valueKey: "TrainType",
        },
      ],
    },
    {
      label: _l("Rank"), // số quyết dịnh
      control: [
        {
          name: "RankName",
          data: listTrainRank,
          placeholder: _p("Nhập"),
          accepter: SelectPicker,
          labelKey: "RankDesc",
          valueKey: "RankDesc",
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (flag === "delete") {
      Train_Course_service.remove(data.TrCsCodeSys).then((resp: any) => {
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
          LearnStartDTimeUTC: formValue.LearnStartDTimeUTC
            ? convertDate(formValue.LearnStartDTimeUTC)
            : "",
          TrCsName: formValue.TrCsName ? formValue.TrCsName : "",
          TrainType: formValue.TrainType ? formValue.TrainType : "",
          RankName: formValue.RankName ? formValue.RankName : "",
          LearnEndDTimeUTC: convertDate(formValue.LearnEndDTimeUTC)
            ? convertDate(formValue.LearnEndDTimeUTC)
            : "",
        };

        if (flagProps === "update") {
          console.log(149, condition);
          Train_Course_service.update({ isNew: true, data: condition }).then(
            (resp: any) => {
              if (resp.Success) {
                toast.success(_t("Add SuccessFully"));
                onSuccess();
                setFormValue({});
                handleClose();
              } else {
                ShowError(resp.ErrorData);
              }
            }
          );
        }
        if (flag === "detail") {
          Train_Course_service.update({ isNew: false, condition }).then(
            (resp: any) => {
              if (resp.Success) {
                toast.success(_t("Update SuccessFully"));
                onSuccess();
                handleClose();
              } else {
                ShowError(resp.ErrorData);
              }
            }
          );
        }
      }
    }
  };

  const render = () => {
    if (flag === "detail") {
      setFormValue({
        LearnStartDTimeUTC: new Date(data.LearnStartDTimeUTC),
        LearnEndDTimeUTC: new Date(data.LearnEndDTimeUTC),
        TrCsName: data.TrCsName,
        TrainType: data.TrainType,
        RankName: data.RankName,
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
