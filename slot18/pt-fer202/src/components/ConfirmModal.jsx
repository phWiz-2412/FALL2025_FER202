import { Modal } from "react-bootstrap";

export default function ConfirmModal({ show, message }) {
  return (
    <Modal show={show} centered backdrop="static">
      <Modal.Body className="text-center fw-bold py-4">{message}</Modal.Body>
    </Modal>
  );
}
