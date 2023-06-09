import { ShowError } from "components/Dialogs/Dialogs";
import ModalStaffEdit from "components/StafffNewDesign/ModalStaffEdit";
import UploadFileStaff from "components/StafffNewDesign/UploadFileStaff";
import { Textarea } from "components/input/Textarea";
import useSelectListContractType from "hooks/Select/useSelectContractType";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DatePicker, SelectPicker, Uploader } from "rsuite";
import Staff_LaborContract_service from "services/Staff/Staff_LaborContract_service";
import store from "store/store";
import { convertDate } from "utils/date";
import { dateRequiredRule, requiredRule } from "utils/validationRules";

export default function StaffLaborContractEdit({
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
  const listContract = useSelectListContractType();
  const [fileContract, setFileContract] = useState("" as any);
  const [fileLaborUpdate, setFileLaborUpdate] = useState("" as any);
  const { staffCode } = useParams();
  const _l = useLocalization("ModalStaffEdit");
  const _t = useLocalization("toast");
  const _p = useLocalization("Placeholder");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFlagProps(flag as string);
  }, [uuid, flag]);
  const handleOpen = () => {
    setOpen(true);
    setFlagProps("update");
  };
  const handleClose = () => {
    setFormValue({} as any);
    setOpen(false);
  };

  const listFormItem: any[] = [
    {
      label: _l("Số hợp đồng"),
      required: true,
      control: [
        {
          name: "ContractNo",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Ngày ký"),
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "SignDate",
          placeholder: _p("Nhập"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },
    {
      label: _l("Ngày hiệu lực"),
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          name: "EffectiveDate",
          placeholder: _p("Từ ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
        {
          rule: dateRequiredRule,
          name: "ExpirationDate",
          placeholder: _p("Đến ngày"),
          accepter: DatePicker,
          className: "w-5",
        },
      ],
    },
    {
      label: _l("Loại hợp đồng"), // phòng ban
      required: true,
      control: [
        {
          rule: dateRequiredRule,
          data: listContract,
          name: "ContactType",
          placeholder: _p("Chọn"),
          accepter: SelectPicker,
          labelKey: "ContractTypeName",
          valueKey: "ContractTypeCode",
        },
      ],
    },
    {
      label: _l("Chi tiết hợp đồng"), // phòng ban
      control: [
        {
          name: "ContractDetail",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Ghi chú"), // phòng ban
      control: [
        {
          name: "Remark",
          accepter: Textarea,
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Mã tham chiếu"), // phòng ban
      control: [
        {
          name: "RefCode",
          placeholder: _p("Nhập"),
        },
      ],
    },
    {
      label: _l("Upload"), // phòng ban
      customComponent: (
        <div style={{ width: 300 }}>
          <UploadFileStaff
            setFileContract={setFileContract}
            fileLaborUpdate={fileLaborUpdate}
            formValue={formValue}
            setFormValue={setFormValue}
            flag={flagProps}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    if (flag === "delete") {
      Staff_LaborContract_service.remove({
        StaffCode: data.StaffCode,
        ContractCodeSys: data.ContractCodeSys,
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
        const condition: any = {
          StaffCode: staffCode,
          ContractNo: formValue.ContractNo ? formValue.ContractNo : "",
          SignDate: formValue.SignDate ? convertDate(formValue.SignDate) : "",
          ContactType: formValue.ContactType ? formValue.ContactType : "",
          ContractCodeSys: formValue.ContractCodeSys
            ? formValue.ContractCodeSys
            : "",
          ContractDetail: formValue.ContractDetail
            ? formValue.ContractDetail
            : "",
          Remark: formValue.Remark ? formValue.Remark : "",
          RefCode: formValue.RefCode ? formValue.RefCode : "",
          EffectiveDate: formValue.EffectiveDate
            ? convertDate(formValue.EffectiveDate)
            : "",
          ExpirationDate: formValue.ExpirationDate
            ? convertDate(formValue.ExpirationDate)
            : "",
          ContractFileUrl: fileContract.Url
            ? fileContract.Url
            : formValue.ContractFileUrl,
          ContractFilePath: fileContract.FilePath
            ? fileContract.FilePath
            : formValue.ContractFileUrl,
          FlagFileUpload: fileContract.FlagFileUpload
            ? fileContract.FlagFileUpload
            : formValue.FlagFileUpload,
          AttFileId: fileContract.AttFileId
            ? fileContract.AttFileId
            : formValue.AttFileId,
          ContractFileName: fileContract.FileName
            ? fileContract.FileName
            : formValue.ContractFileName,
          ContractFileSize: fileContract.FileSize
            ? fileContract.FileSize
            : formValue.ContractFileSize,
        };

        if (flagProps === "update") {
          Staff_LaborContract_service.update({
            isNew: true,
            data: condition,
          }).then((resp: any) => {
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
          Staff_LaborContract_service.update({
            isNew: false,
            data: condition,
          }).then((resp: any) => {
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
        ContractNo: data.ContractNo,
        SignDate: new Date(data.SignDate),
        ContactType: data.ContactType,
        ContractDetail: data.ContractDetail,
        Remark: data.Remark,
        RefCode: data.RefCode,
        EffectiveDate: new Date(data.EffectiveDate),
        ExpirationDate: new Date(data.ExpirationDate),
        ContractCodeSys: data.ContractCodeSys,
        ContractFileUrl: data.ContractFileUrl,
        ContractFilePath: data.ContractFilePath,
        FlagFileUpload: data.FlagFileUpload,
        AttFileId: data.AttFileId,
        ContractFileName: data.ContractFileName,
        ContractFileSize: data.ContractFileSize,
      });
    }
  };
  useEffect(() => {
    render();
    setFileLaborUpdate({
      ContractFileName: data?.ContractFileName,
      ContractFileUrl: data?.ContractFileUrl,
    });
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
