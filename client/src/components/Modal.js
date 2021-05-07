import React from 'react';

const Modal = props => {
  const modalRef = React.useRef()

  React.useEffect(() => {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    window.M.Modal.init(modalRef.current, options);

  })

  return (
    <div className="modal-wrap">
      <button data-target="modal" className="btn modal-trigger">{props.option.btn}</button>
      <div ref={modalRef} id="modal" className="modal">
        <div className="modal-content">
          <h4>{props.option.header}</h4>
          <p>{props.option.text}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">Отмена</button>
          <button className="modal-close waves-effect waves-green btn-flat">Ок</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;