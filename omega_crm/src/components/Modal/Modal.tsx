import './Modal.css';

interface ModalProps {
  show: boolean;
  onClose: ()=>void;
  children: React.ReactNode;
}

function Modal ({ show, onClose, children }: ModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal;