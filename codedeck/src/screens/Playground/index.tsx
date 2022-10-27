import React, { useContext,useState } from "react";
import EditorContainer from "./EditorContainer";
import InputConsole from "./InputConsole";
import Navbar from "./Navbar";
import OutputConsole from "./OutputConsole";
import { useParams } from "react-router-dom";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import styled from "styled-components";
import { ModalContext } from "../../context/ModalContext";
import { languageMap } from "../../context/PlaygroundContext";
import Modal from "../../components/Modal";
import axios from "axios";
import {Buffer} from "buffer";

const MainApp = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  // background: red;
  height: calc(100vh-4.5rem);
`;

const Consoles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`;

const Playground = () => {
  const { folderId, playgroundId } = useParams();

  const { folders,savePlayground } = useContext(PlaygroundContext)!;
  const { title, language ,code} =
    folders[folderId as string].items[playgroundId as string];

  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput,setCurrentInput] = useState("");
  const [currentLanguage,setCurrentLanguage] = useState(language);
  const [currentOutput,setCurrentOutput] = useState("");

  const {isOpen,openModal,closeModal} = useContext(ModalContext)!;

  const saveCode=()=>{
    savePlayground(
      folderId as string,
      playgroundId as string,
      currentCode as string,
      currentLanguage
    )
  }
  // const runCode = async()=>{
  //   op
  // }

  const encode = (str: string)=>{
    return Buffer.from(str,"binary").toString("base64");
  }

  const decode = (str: string)=>{
    return Buffer.from(str,"base64").toString();
  }

  const postSubmission = async(language_id:number,source_code:string,stdin:string)=>{
    
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {base64_encoded: 'true', fields: '*'},
      headers: {
        // 'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'e3d7cbc466mshec3ea63c00d01d2p156e05jsn826adebb2586',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

  const res = await axios.request(options);
  return res.data.token;
  
  };

  const getOutput:(token:string)=>any=async(token:string)=>{

  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/'+token,
    params: {base64_encoded: 'true', fields: '*'},
    headers: {
    'X-RapidAPI-Key': 'e3d7cbc466mshec3ea63c00d01d2p156e05jsn826adebb2586',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };
  const res = await axios.request(options);
  if(res.data.status_id <= 2){
    const res2 = await getOutput(token);
    return res2.data;
  }
  return res.data;
  }

  const runCode = async () =>{
    // openModal({
    //   value: true,
    //   type: "6",
    //   identifier:{
    //     folderId:"",
    //     cardId:"",
    //   }
    // });

    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    const token = await postSubmission(language_id,source_code,stdin);

    const res = await getOutput(token);
    const status_name = res.status.description;
    //for output
    const decoded_output = decode(res.stdout ? res.stdout : "");
    
    //compile output
    const decoded_compile_output = decode(
      res.compile_output ? res.compile_output : ""
    );
    //for any errors
    const decoded_stderr  = decode(res.stderr? res.stderr : "");

    let final_output="";
    if(res.status_id!==3){//successful execution
      if(decoded_compile_output===""){
        final_output = decoded_stderr;
      }else{
        final_output = decoded_output;
      }
    }else{
      final_output = decoded_output;
    }
    setCurrentOutput(status_name+"\n\n"+final_output);
    // closeModal();
  };
 

  return (
    <div>
      <Navbar />
      <MainApp>
        <EditorContainer
          title={title}
          currentLang={currentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId as string}
          cardId ={playgroundId as string}
          saveCode={saveCode}
          runCode={runCode}
          setCurrentLang={setCurrentLanguage}
          // language = {currentLanguage}
          
        />
        <Consoles>
          <InputConsole currentInput={currentInput} setCurrentInput={setCurrentInput}/>
          <OutputConsole currentOutput={currentOutput}/>
        </Consoles>
      </MainApp>{isOpen.value===true?<Modal/>:<></>}
    </div>
  );
};

export default Playground;
