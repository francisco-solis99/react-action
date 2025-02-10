import React, { forwardRef } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  onCloseModal: () => void,
  children: React.ReactNode
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(props, ref) {
  return ReactDOM.createPortal(
    <dialog ref={ref} className="modal">
      <h3>Congrats you have won!</h3>
      <div className="modal__content">
        {props.children}
      </div>
      <button className="modal__button" onClick={props.onCloseModal}>Restart</button>
    </dialog>,
    document.body
  );
});

export default Modal