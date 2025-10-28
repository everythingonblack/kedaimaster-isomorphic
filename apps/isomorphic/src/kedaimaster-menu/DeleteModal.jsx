// src/components/DeleteModal.jsx
import React from 'react';
import styles from './page.module.css';

const DeleteModal = ({ isOpen, item, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.cartModalOverlay}>
      <div className={styles.cartModalContent}>
        <p className={styles.modalItemName}>Hapus "{item?.name}" dari keranjang?</p>
        <div className={styles.cartModalActions}>
          <button className={styles.cancelDeleteBtn} onClick={onCancel}>Batal</button>
          <button className={styles.confirmDeleteBtn} onClick={onConfirm}>Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;