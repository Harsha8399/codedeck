import React, { useContext, useState } from 'react'
import {MdOutlineClose} from 'react-icons/md';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import {CloseButton,Header,Input,ModalProps} from "../Modal";
import Select from "react-select"
import styled from 'styled-components';


const InputSelect = styled.div`
    display: grid;
    grid-template-columns: 1fr 0,5fr;
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

const NewCard = ({closeModal,identifier}:ModalProps) => {

  const {folderId} = identifier;

  const {folders,createNewPlayground} = useContext(PlaygroundContext)!;
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
    <Input><input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} />
    <Select value={language} options={languageOptions} onChange={handleChangeLanguage}/> 

    <button onClick={()=>{createNewPlayground(folderId,title,language.value);
    closeModal();}}>Create Playground</button>
    </Input>
    </InputSelect>
    </div>
  );
};

export default NewCard;