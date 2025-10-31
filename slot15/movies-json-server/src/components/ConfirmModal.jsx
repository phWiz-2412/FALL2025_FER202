import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">{title || "Xác nhận"}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p className="fs-5">{message || "Bạn có chắc muốn thực hiện hành động này?"}</p>
          </div>
          <div className="modal-footer">
            <Button variant="secondary" onClick={onCancel}>
              Hủy
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
