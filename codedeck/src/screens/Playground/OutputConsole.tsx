import React from 'react'
import styled from 'styled-components';
import {BiExport} from "react-icons/bi";

const Console = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    position: relative;
`;

const Header = styled.div`
    height: 4rem;
    background: #ededed;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.16);
    z-index:2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    font-weight: 600;
    button{
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 400;
        font-size: 1rem;
        background: transparent;
        outline: 0;
        border: 0;
    }
    svg{
        font-size: 1.5rem;
    }
`;

const OutputArea = styled.textarea`
    flex-grow: 1;
    background: #e7e7e7;
    padding: 0.25rem;
    font-size: 1.1rem;
    font-style: italic;
    padding-top: 0.25rem;
`;

interface OutputConsoleProps{
    currentOutput: string;
}

const OutputConsole: React.FC<OutputConsoleProps> = ({currentOutput}) => {
  return (
    <Console>
    <Header>
        Output: 
        <button><BiExport/>Export Output</button>
        </Header>
        <OutputArea value={currentOutput} disabled></OutputArea>
        </Console>
  )
}

export default OutputConsole;