import React, { useContext, useState } from 'react'
import {MdOutlineClose} from 'react-icons/md';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import {CloseButton,Header,Input,ModalProps} from "../Modal";


const NewFolder = ({closeModal,identifier}:ModalProps) => {

//   const {folderId,cardId} = identifier;

  const {folders,createNewFolder} = useContext(PlaygroundContext)!;
  const [title,setTitle] = useState("");
  return (
    <div>
    <Header><h2>Create New Folder</h2>
        <CloseButton 
            onClick={()=>{
            closeModal();
        }}
        >
            <MdOutlineClose/>
        </CloseButton>

    </Header>
    <Input><input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} />
    <button onClick={()=>{createNewFolder(title);
    closeModal();}}>Create Folder</button>
    </Input>
    </div>
  );
};

export default NewFolder;