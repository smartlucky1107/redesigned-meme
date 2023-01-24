import React, { useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next');



function CustomModal(props) {
  let subtitle;
  
  const { paragraphs, modalIsOpen, closeModal } = props;
  const textRef =  useRef(null);

 

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function saveText() {
    let value  = textRef.current.value;
    closeModal(value);
  }

  return (
    <div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="edit_modal"
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Let's edit the typing text</h2>
        <textarea ref={textRef}  name="content" className="edit_area" cols="30" rows="8" defaultValue={paragraphs}></textarea>
        <button onClick={saveText} className="edit_button">Save</button>
      </Modal>
    </div>
  );
}

export default CustomModal;