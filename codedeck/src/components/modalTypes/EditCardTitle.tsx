import React from 'react'
import {MdOutlineClose} from 'react-icons/md';
import {CloseButton,ModalProps} from "../Modal";


const EditCardTitle = ({closeModal,identifier}:ModalProps) => {
  return (
    <div>EditCardTitle
        <CloseButton 
            onClick={()=>{
            closeModal();
        }}
        >
            <MdOutlineClose/>
        </CloseButton>

    </div>
  );
};

export default EditCardTitle;