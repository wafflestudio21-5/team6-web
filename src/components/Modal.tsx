import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import usePreventScroll from "../hooks/usePreventScroll";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  usePreventScroll();
  return (
    <div className={styles.modalContainer} onClick={handleClickOutside}>
      {children}
    </div>
  );
}
