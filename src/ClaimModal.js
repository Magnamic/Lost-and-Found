import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

function ClaimModal({ isOpen, onRequestClose, item }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Claim Item"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Claim Your Item</h2>
      {item && (
        <>
          <p>
            <strong>Item Type:</strong> {item.itemType}
          </p>
          <p>
            <strong>Name Tag:</strong> {item.studentName}
          </p>
          <img
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.itemType}
            style={{ width: 200, borderRadius: 8, marginBottom: 16 }}
          />
          <p>
            Please visit your school's lost and found department to collect your item.
          </p>
        </>
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default ClaimModal;