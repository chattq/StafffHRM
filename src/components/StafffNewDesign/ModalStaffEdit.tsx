import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import FormValidate from "components/FormValidate/FormValidate";
import { useLocalization } from "hooks/useLocalization";
import { Modal } from "rsuite";
import TableLabor from "./TableLabor";
import { useSelector } from "react-redux";

export default function ModalStaffEdit({
  handleSubmit,
  flagProps,
  handleClose,
  formRef,
  flag,
  button,
  handleOpen,
  listFormItem,
  setFormValue,
  formValue,
  dataTable,
  data,
  open,
}: {
  handleSubmit?: any;
  flagProps?: any;
  handleClose?: any;
  formRef?: any;
  flag?: any;
  button?: any;
  listFormItem?: any;
  setFormValue?: any;
  handleOpen?: any;
  formValue?: any;
  open?: any;
  data?: any;
  dataTable?: any;
}) {
  // console.log(37, flag);
  const _t = useLocalization("toast");
  const checkModal = useSelector((state: any) => state.ui.checkModal);
  const body = () => {
    if (flag === "delete") {
      return <strong className="delete-text">{_t("Bạn có muốn xóa?")}</strong>;
    } else if (flag === "history") {
      return (
        <TableLabor
          dataHeader={["Ngày", "Trạng thái", "Lý do", "Thời gian cập nhật"]}
          inforLabor={dataTable()}
          data={data}
        />
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

  return (
    <>
      <span onClick={handleOpen}>{button}</span>
      <Modal
        keyboard={false}
        open={open}
        onClose={handleClose}
        size={checkModal ? "md" : "sm"}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: flag === "history" ? "10px" : "" }}>
          {body()}
        </Modal.Body>
        {flag === "history" ? null : (
          <ModalFooterComponent
            onUpdate={handleSubmit}
            onDelete={handleSubmit}
            onChangeToUpdate={handleSubmit}
            flag={flagProps}
            onClose={handleClose}
          />
        )}
      </Modal>
    </>
  );
}
