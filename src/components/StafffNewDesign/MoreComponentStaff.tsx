import PermissionContainer from "components/PermissionContainer";
import { memo, useRef, useState } from "react";
import { Button, DatePicker, Dropdown, Uploader } from "rsuite";
import { v4 as uuid } from "uuid";

import { MoreInterface } from "components/interface";
import staff_service from "services/Staff/staff_service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ShowError } from "components/Dialogs/Dialogs";
import { useLocalization } from "hooks/useLocalization";
import ModalStaffEdit from "./ModalStaffEdit";
import { dateRequiredRule } from "utils/validationRules";
import { Textarea } from "components/input/Textarea";

function MoreComponentStaff() {
  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;
  const _t = useLocalization("toast");
  const formRef: any = useRef(null);
  const [formValue, setFormValue] = useState({} as any);
  const { staffCode } = useParams<string>();
  const nav = useNavigate();
  const [changeTitleDate, setChangeTitleDate] = useState("" as any);
  const handleDeleteStaff = async (code: any) => {
    const resp = await staff_service.remove({
      StaffCode: staffCode,
      OrgID: NetWorkID,
    });
    if (resp.Success) {
      toast.success(_t("Delete SuccessFully"));
      nav(`/${NetWorkID}/StaffNew`);
    } else {
      ShowError(resp.ErrorData);
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const _l = useLocalization("ModalStaffEdit");
  const _p = useLocalization("Placeholder");

  const listFormItem: any[] = [
    {
      label: changeTitleDate ? _l("Ngày nghỉ việc") : _l("Ngày tạm dừng"),
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
      label: _l("Lý do"),
      required: true,
      control: [
        {
          name: "ContractNo",
          placeholder: _p("Nhập"),
          accepter: Textarea,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    console.log("a");
  };
  const handleChangeDatePause = () => {
    setChangeTitleDate(true);
  };
  const handleChangeDateOff = () => {
    setChangeTitleDate(false);
  };

  const items = [
    <Dropdown.Item key={1} onClick={handleDeleteStaff}>
      Xóa
    </Dropdown.Item>,
    <ModalStaffEdit
      button={
        <Dropdown.Item key={2} onClick={handleChangeDatePause}>
          Nghỉ việc
        </Dropdown.Item>
      }
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      listFormItem={listFormItem}
      formRef={formRef}
      setFormValue={setFormValue}
      handleSubmit={handleSubmit}
      flagProps={"update"}
    />,
    <ModalStaffEdit
      button={
        <Dropdown.Item key={3} onClick={handleChangeDateOff}>
          Tạm dừng
        </Dropdown.Item>
      }
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      listFormItem={listFormItem}
      formRef={formRef}
      setFormValue={setFormValue}
      handleSubmit={handleSubmit}
      flagProps={"update"}
    />,
  ];
  return (
    <div>
      <Dropdown
        title={
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.999"
              height="4"
              viewBox="0 0 17.999 4">
              <path
                id="ic_more"
                d="M1495,6278a2,2,0,1,1,2,2A2,2,0,0,1,1495,6278Zm-7,0a2,2,0,1,1,2,2A2,2,0,0,1,1488,6278Zm-7,0a2,2,0,1,1,2,2A2,2,0,0,1,1481,6278Z"
                transform="translate(-1481.001 -6276)"
                fill="#0e223d"
              />
            </svg>
          </div>
        }
        style={{ border: "1px solid", borderRadius: "5px" }}
        placement="bottomEnd">
        {items}
      </Dropdown>
    </div>
  );
}

export default memo(MoreComponentStaff);
