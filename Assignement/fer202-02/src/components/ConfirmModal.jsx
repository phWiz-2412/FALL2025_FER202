import { Modal } from "react-bootstrap";

export default function ConfirmModal({ show, message, onHide }) {
  return (
    <Modal show={show} centered onHide={onHide}>
      <Modal.Body className="text-center fw-bold py-4">{message}</Modal.Body>
    </Modal>
  );
}
