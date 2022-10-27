import React, { useContext, useState } from 'react'
import {MdOutlineClose} from 'react-icons/md';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import {CloseButton,Header,Input,ModalProps} from "../Modal";


const EditCardTitle = ({closeModal,identifier}:ModalProps) => {

  const {folderId,cardId} = identifier;

  const {folders,editCardTitle} = useContext(PlaygroundContext)!;
  const [title,setTitle] = useState(folders[folderId].items[cardId].title as string);
  return (
    <div>
    <Header><h2>Edit Card Title</h2>
        <CloseButton 
            onClick={()=>{
            closeModal();
        }}
        >
            <MdOutlineClose/>
        </CloseButton>

    </Header>
    <Input><input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} />
    <button onClick={()=>{editCardTitle(folderId,cardId,title);
    closeModal();}}>Update Title</button>
    </Input>
    </div>
  );
};

export default EditCardTitle;