import React from 'react'
import {MdOutlineClose} from 'react-icons/md';
import {CloseButton,ModalProps} from "../Modal";

const EditFolderTitle = ({closeModal,identifier}:ModalProps) => {
    return (
        <div>EditFolderTitle
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

export default EditFolderTitle