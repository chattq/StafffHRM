import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import FormValidate from "components/FormValidate/FormValidate";
import { useLocalization } from "hooks/useLocalization";
import { Modal } from "rsuite";

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
}) {
  const _t = useLocalization("toast");
  const body = () => {
    if (flag === "delete") {
      return <strong className="delete-text">{_t("Bạn có muốn xóa?")}</strong>;
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
      <Modal keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body()}</Modal.Body>
        <ModalFooterComponent
          onUpdate={handleSubmit}
          onDelete={handleSubmit}
          onChangeToUpdate={handleSubmit}
          flag={flagProps}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
}
