import { useRef } from "react";

export default function useModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (!modalRef.current) return;
    modalRef.current.showModal();
  };

  const closeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.close();
  };
  return {
    modalRef,
    openModal,
    closeModal,
  };
}
