import React,{useState,useContext} from 'react'
import CodeEditor from './CodeEditor'
import styled from 'styled-components';
import { BiEditAlt, BiExport, BiFullscreen, BiImport } from 'react-icons/bi';
import Select from "react-select";
import { ModalContext } from '../../context/ModalContext';
import { languageMap } from '../../context/PlaygroundContext';
import { resolve } from 'path';

const StyeldEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpperToolbar = styled.div`
  background: white;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

`;

const Title = styled.div`
  display:flex;
  align-items: center;
  gap: 1rem;
  h3{
    font-size: 1.3rem;
  }
  button{
    background:transparent;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
  }
`

const LowerToolbar= styled.div`
  background: white;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  button{
    background: transparent;
    outline: 0;
    border: 0 ;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    svg{
      font-size: 1.4rem;
    }
  }
  
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;
const RunCode = styled.button`
  padding: 1rem 2rem;
  color: white;
  font-weight: 700;
  border-radius: 2rem;
  background: #0097d7 !important;
`
const SelectBars=styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div:first-child{
    width: 8rem;
  }
`;
const SaveCode = styled.button`
  padding: 0.8rem 2rem;
  background-color: #0097d7 !important;
  color: white;
  border-radius: 2rem;
  font-weight: 700;
  `

interface EditorContainerProps{
  title: string;
  // language: string;
  folderId: string;
  cardId: string;
  currentCode: string;
  setCurrentCode: (newCode: string)=> void;
  currentLang: string;
  setCurrentLang: (newLang: string)=> void;
  saveCode: () => void;
  runCode: () => void;
}

const EditorContainer:React.FC<EditorContainerProps> = ({title,folderId,cardId,currentCode,setCurrentCode,currentLang,setCurrentLang,saveCode,runCode}) => {
  const languageOptions = [
    {value: "c++", label:"C++"},
    {value: "java", label:"Java"},
    {value: "python", label:"Python"},
    {value: "javascript", label:"Javascript"},
  ];

  const themeOptions=[
    {value: "duotoneLight", label:"duotoneLight"},
    {value: "duotoneDark", label:"duotoneDark"},
    {value: "xcodeLight", label:"xcodeLight"},
    {value: "xcodeDark", label:"xcodeDark"},
    {value: "okaidia", label:"okaidia"},
    {value: "githubDark", label:"githubDark"},
    {value: "githubLight", label:"githubLight"},
    {value: "bespin", label:"bespin"},
    {value: "dracula", label:"dracula"},
  ];
  
  const [selectedLang,setSelectedLang] = useState(()=>{
    for(let i=0;i<languageOptions.length;i++){
      if(languageOptions[i].value===currentLang)   
        return languageOptions[i];
    }
    return languageOptions[0];
  });
  const [selectedTheme,setSelectedTheme] = useState({value: "duotoneDark", label:"duotoneDark"});

  const handleChangeLang=(selectedOption:any)=>{
    setSelectedLang(selectedOption);
    setCurrentCode(languageMap[selectedOption.value].defaultCode);
    setCurrentLang(selectedOption.value);
  };

  const handleChangeTheme=(selectedOption:any)=>{
    setSelectedTheme(selectedOption);
  }

  const getFile=(e:any)=>{
    const input = e.target;

    if("files" in input && input.files.length > 0){
      placeFileContent(input.files[0]);
    }
  };

  const placeFileContent = (file:any)=>{
    readFileContent(file).then((content)=>{setCurrentCode(content as string);

  }).catch((error)=>console.log(error));
  };

  const readFileContent=(file:any)=>{
    const reader = new FileReader();
    return new Promise((resolve,reject)=>{
      reader.onload = (event)=>resolve(event!.target!.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  const {openModal} = useContext(ModalContext)!;

  return (
    <StyeldEditorContainer>

      <UpperToolbar><Title>
        <h3>{title}</h3>
        <button onClick={()=>openModal({
          value: true,
          type: "1",
          identifier:{
            folderId: folderId,
            cardId: cardId,
          }
        })}><BiEditAlt/></button>
        </Title>

        <SelectBars><SaveCode onClick={()=>{saveCode();}}>Save Code</SaveCode>
          <Select value={selectedLang} options={languageOptions} onChange={handleChangeLang}/> 
        <Select value={selectedTheme} options={themeOptions} onChange={handleChangeTheme}/>
        </SelectBars>
        </UpperToolbar>

        {/* Code Editor and its props*/}
      <CodeEditor currentLanguage={selectedLang.value} currentTheme={selectedTheme.value} currentCode={currentCode} setCurrentCode={setCurrentCode}/>
      
      <LowerToolbar>
        <ButtonGroup>
        <button><BiFullscreen/>Full screen</button>
        <label><input type='file' accept='.txt' style={{display:"none"}} onChange={(e)=>{getFile(e)}}/><BiImport/>Import Code</label>
        <button><BiExport/>Export Code</button>
        </ButtonGroup>
        <RunCode onClick={()=>{runCode();}}>Run Code</RunCode>
      </LowerToolbar>

    </StyeldEditorContainer>
  )
}

export default EditorContainer;