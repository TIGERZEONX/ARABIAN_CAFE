import styles from "./ConfirmDialog.module.css";

import Modal from "../Modal";

import Button from "@/components/atoms/Button";

export default function ConfirmDialog({
  open,
  title,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
    >

      <div className={styles.actions}>

        <Button
          label="Cancel"
          variant="secondary"
          onClick={onCancel}
        />

        <Button
          label="Confirm"
          variant="danger"
          onClick={onConfirm}
        />

      </div>

    </Modal>
  );
}