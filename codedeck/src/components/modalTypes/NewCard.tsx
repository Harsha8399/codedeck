import React from 'react'
import {MdOutlineClose} from 'react-icons/md';
import {CloseButton,ModalProps} from "../Modal";

const NewCard = ({closeModal,identifier}:ModalProps) => {
    return (
        <div>NewCard
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

export default NewCard;