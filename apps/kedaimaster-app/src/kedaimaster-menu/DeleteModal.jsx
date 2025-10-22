// src/components/DeleteModal.jsx
import React from 'react';

const DeleteModal = ({ isOpen, item, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div id="delete-confirm-modal" className="cart-modal-overlay">
      <div className="cart-modal-content">
        <p id="modal-item-name">Hapus "{item?.name}" dari keranjang?</p>
        <div className="cart-modal-actions">
          <button id="cancel-delete-btn" onClick={onCancel}>Batal</button>
          <button id="confirm-delete-btn" onClick={onConfirm}>Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;