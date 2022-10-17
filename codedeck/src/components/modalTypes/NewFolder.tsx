import React from 'react';
import {MdOutlineClose} from 'react-icons/md';
import {CloseButton,ModalProps} from "../Modal";

const NewFolder = ({closeModal,identifier}:ModalProps) => {
    return (
        <div>NewFolder
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

export default NewFolder