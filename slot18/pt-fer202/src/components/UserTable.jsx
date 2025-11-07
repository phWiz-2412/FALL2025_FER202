import { useContext, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function UserTable() {
  const { state, updateUser } = useContext(UserContext);

  const [selectedUser, setSelectedUser] = useState(null);     // user được chọn để xem chi tiết
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);   // lock / unlock
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 🟢 Xem chi tiết user
  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  // 🔴 Gọi khi click nút Lock/Unlock
  const handleAskConfirm = (user) => {
    setSelectedUser(user);
    setConfirmAction(user.status === "active" ? "lock" : "unlock");
    setShowConfirmModal(true);
  };

  // 🟡 Xác nhận thực hiện khóa/mở
  const handleConfirmToggle = async () => {
    if (!selectedUser) return;
    const newStatus = confirmAction === "lock" ? "locked" : "active";
    const updated = { ...selectedUser, status: newStatus };
    await updateUser(updated);
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Table bordered hover responsive className="align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                <img
                  src={u.avatar || "https://via.placeholder.com/40"}
                  alt="avatar"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
              </td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td
                className={
                  u.status === "active"
                    ? "text-success fw-semibold"
                    : "text-danger fw-semibold"
                }
              >
                {u.status}
              </td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  className="me-2"
                  onClick={() => handleView(u)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant={u.status === "active" ? "danger" : "success"}
                  onClick={() => handleAskConfirm(u)}
                >
                  {u.status === "active" ? "Lock" : "Unlock"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🧩 Modal chi tiết user */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="text-start">
              <p><b>ID:</b> {selectedUser.id}</p>
              <p><b>Username:</b> {selectedUser.username}</p>
              <p><b>Full Name:</b> {selectedUser.fullName}</p>
              <p><b>Role:</b> {selectedUser.role}</p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    selectedUser.status === "active"
                      ? "text-success fw-semibold"
                      : "text-danger fw-semibold"
                  }
                >
                  {selectedUser.status}
                </span>
              </p>
              {selectedUser.avatar && (
                <div className="text-center">
                  <img
                    src={selectedUser.avatar}
                    alt="avatar"
                    width="100"
                    className="rounded mt-3"
                  />
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🟠 Modal xác nhận lock/unlock */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {confirmAction === "lock" ? "Lock Account" : "Unlock Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedUser && (
            <>
              <p>
                Bạn có chắc muốn{" "}
                <b>
                  {confirmAction === "lock" ? "KHÓA" : "MỞ KHÓA"}
                </b>{" "}
                tài khoản <b>{selectedUser.username}</b> không?
              </p>
              <p className="text-muted small">
                (Thao tác này sẽ cập nhật trạng thái trong hệ thống.)
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            variant={confirmAction === "lock" ? "danger" : "success"}
            onClick={handleConfirmToggle}
          >
            {confirmAction === "lock" ? "Lock" : "Unlock"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
