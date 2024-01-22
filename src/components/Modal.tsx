import { ReactNode } from "react";
import styles from "./Modal.module.scss";

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
  return (
    <div className={styles.modalContainer} onClick={handleClickOutside}>
      {children}
    </div>
  );
}
 