import React, { useContext, useState } from 'react'
import {MdOutlineClose} from 'react-icons/md';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import {CloseButton,Header,Input,ModalProps} from "../Modal";
import Select from "react-select"
import styled from 'styled-components';


const InputSelect = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    row-gap: 1rem;
    column-gap: 1rem;
    margin-top: 1.2rem;
    align-items: center;
    input{
        flex-grow: 1;
        height: 2rem;

    }
    button{
        background: #241f21;
        height: 2rem;
        color: white;
        padding: 0 2rem;
    }
`

const NewFolderAndPlayground = ({closeModal,identifier}:ModalProps) => {

  const {folderId} = identifier;

  const {folders,createNewFolderAndPlayground} = useContext(PlaygroundContext)!;
  const [title,setTitle] = useState("");
  const languageOptions = [
    {value: "c++", label:"C++"},
    {value: "java", label:"Java"},
    {value: "python", label:"Python"},
    {value: "javascript", label:"Javascript"},
  ];
  
  const [language,setLanguage] = useState(languageOptions[0]);
  
  const handleChangeLanguage=(SelectedOptions: any)=>{
    setLanguage(SelectedOptions);
  }

  const [cardTitle,setCardTitle] = useState("");
  const [folderTitle,setFolderTitle] = useState("");
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
    <InputSelect>
    <label>Enter Folder Name</label>
    <Input><input type='text' value={cardTitle} onChange={(e)=>setCardTitle(e.target.value)} />
    <label>Enter Card Name</label>
    <input type='text' value={folderTitle} onChange={(e)=>setFolderTitle(e.target.value)} />
    <Select value={language} options={languageOptions} onChange={handleChangeLanguage}/> 

    <button onClick={()=>{createNewFolderAndPlayground(folderTitle,cardTitle,language.value);
    closeModal();}}>Create Playground</button>
    </Input>
    </InputSelect>
    </div>
  );
};

export default NewFolderAndPlayground;