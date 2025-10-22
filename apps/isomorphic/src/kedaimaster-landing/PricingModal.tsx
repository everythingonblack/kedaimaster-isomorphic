import React, { useEffect, useState, useRef, useCallback } from "react";

interface PricingModalProps {
  show: boolean;
  onClose: () => void;
  packageType: string;
}

const packagePricing = {
  starter: {
    title: "Starter Pack - Pilih Periode",
    subtitle: "Mulai dari Rp 699.000/bulan",
    monthly: "Rp 4.194.000/6 bulan",
    yearly: "Rp 7.689.000/1 tahun",
    yearly2: "Rp 13.980.000/2 tahun",
  },
  professional: {
    title: "Professional Pack - Pilih Periode",
    subtitle: "Mulai dari Rp 1.700.000/bulan",
    monthly: "Rp 10.200.000/6 bulan",
    yearly: "Rp 18.700.000/1 tahun",
    yearly2: "Rp 34.000.000/2 tahun",
  },
  business: {
    title: "Enterprise Pack - Pilih Periode",
    subtitle: "Mulai dari Rp 2.500.000/bulan",
    monthly: "Rp 15.000.000/6 bulan",
    yearly: "Rp 27.500.000/1 tahun",
    yearly2: "Rp 50.000.000/2 tahun",
  },
};

const PricingModal: React.FC<PricingModalProps> = ({
  show,
  onClose,
  packageType,
}) => {
  const [currentPackage, setCurrentPackage] = useState("");
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalHeaderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [modalStartX, setModalStartX] = useState(0);
  const [modalStartY, setModalStartY] = useState(0);

  useEffect(() => {
    if (show) {
      setCurrentPackage(packageType);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, packageType]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && show) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  const _startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const modalContent = modalContentRef.current;
    if (!modalContent) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setDragStartX(clientX);
    setDragStartY(clientY);

    const rect = modalContent.getBoundingClientRect();
    setModalStartX(rect.left + rect.width / 2);
    setModalStartY(rect.top + rect.height / 2);

    modalContent.classList.add("dragging");
    if (modalHeaderRef.current) {
      modalHeaderRef.current.classList.add("dragging");
    }
  }, []);

  const drag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const modalContent = modalContentRef.current;
      if (!modalContent) return;

      const currentX =
        (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
      const currentY =
        (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;

      const deltaX = currentX - dragStartX;
      const deltaY = currentY - dragStartY;

      const newX = modalStartX + deltaX;
      const newY = modalStartY + deltaY;

      const maxX = window.innerWidth - modalContent.offsetWidth / 2;
      const maxY = window.innerHeight - modalContent.offsetHeight / 2;
      const minX = modalContent.offsetWidth / 2;
      const minY = modalContent.offsetHeight / 2;

      const clampedX = Math.max(minX, Math.min(newX, maxX));
      const clampedY = Math.max(minY, Math.min(newY, maxY));

      modalContent.style.left = clampedX + "px";
      modalContent.style.top = clampedY + "px";
      modalContent.style.transform = "translate(-50%, -50%)";
    },
    [isDragging, dragStartX, dragStartY, modalStartX, modalStartY]
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.classList.remove("dragging");
    }
    if (modalHeaderRef.current) {
      modalHeaderRef.current.classList.remove("dragging");
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchmove", drag);
      document.addEventListener("touchend", endDrag);
    } else {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("touchend", endDrag);
    }
    return () => {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("touchend", endDrag);
    };
  }, [isDragging, drag, endDrag]);

  const selectPlan = (period: string) => {
    // In a real application, you might want to use React Router or a similar library
    // for navigation instead of direct window.location.href manipulation.
    // For this example, we'll keep it as is to match the original functionality.
    window.location.href = `contactkm.html?package=${currentPackage}&period=${period}`;
  };

  if (!show) {
    return null;
  }

  const pricing = packagePricing[currentPackage as keyof typeof packagePricing];

  return (
    <div className="pricingModal" onClick={onClose}>
      <div
        className="modalContent"
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <button className="modalClose" onClick={onClose}>
          &times;
        </button>
        <div className="modalHeader">
          <h3>{pricing?.title}</h3>
          <p>{pricing?.subtitle}</p>
        </div>

        <div className="modalOptionsContainer">
          <div
            className="modalOptionCard"
            onClick={() => selectPlan("monthly")}
          >
            <div className="optionHeader">
              <span className="optionTitle">Bulanan</span>
            </div>
            <div className="optionPrice">{pricing?.monthly}</div>
            <div className="optionDescription">
              minimal Pembelian 6 bulan dengan fleksibilitas tinggi
            </div>
          </div>

          <div
            className="modalOptionCard popular"
            onClick={() => selectPlan("yearly")}
          >
            <div className="popularBadge">Free 1 bulan</div>
            <div className="optionHeader">
              <span className="optionTitle">Tahunan</span>
            </div>
            <div className="optionPrice">{pricing?.yearly}</div>
            <div className="optionDescription">
              Pembayaran tahunan dengan penghematan maksimal
            </div>
          </div>

          <div
            className="modalOptionCard popular"
            onClick={() => selectPlan("yearly2")}
          >
            <div className="popularBadge">Free 4 bulan</div>
            <div className="optionHeader">
              <span className="optionTitle">Tahunan</span>
            </div>
            <div className="optionPrice">{pricing?.yearly2}</div>
            <div className="optionDescription">
              Pembayaran tahunan dengan penghematan maksimal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
