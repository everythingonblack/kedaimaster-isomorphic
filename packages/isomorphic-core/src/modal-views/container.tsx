"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useModal } from "./use-modal";
import { Modal } from "./modal";

export function ModalViews() {
  const { isOpen, view, closeModal, customSize, size } = useModal();
  const pathname = useLocation();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      size={size}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100"
      className="z-[9999] [&_.pointer-events-none]:overflow-visible"
    >
      {view}
    </Modal>
  );
}
