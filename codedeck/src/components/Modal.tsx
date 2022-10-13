import React, { useContext } from "react";
import styled from "styled-components";
import {MdOutlineClose} from 'react-icons/md';
import {BiEditAlt} from "react-icons/bi";
import {ModalContext} from "../context/ModalContext";
import {PlaygroundContext} from "../context/PlaygroundContext";

const ModalContainer = styled.div`
    background: rgba(0,0,0,0.4);
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0 ;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalContent = styled.div`
    background: white;
    width: 30%;
    padding: 2rem;
    border-radius: 2rem;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const CloseButton = styled.button`
    background: transparent;
    outline: 0;
    border: 0;
    font-size: 2rem;
    cursor: pointer;

`;
const Input = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0;
    gap: 2rem;
    padding-bottom : 0,
    input{
        flex-grow: 1;
        height: 2rem;
    }
    button{
        background: #241f21;
        height: 2rem;
        color: white;
        padding: 2rem;
    }
    `;

const EditCardModal = ({
    setIsOpen,
    isOpen,
}:{
    setIsOpen: any;
    isOpen: any;
})=>{
    const PlaygroundFeatures = useContext(PlaygroundContext)!;
    const folders = PlaygroundFeatures.folders;

    const currentFolder = folders[isOpen.identifier.folderId];
    const currentCard = currentFolder.items[isOpen.identifier.cardId]
    
return(
    <>
    <Header>
        <h2 className="Heading">Edit Cards title</h2>
        <CloseButton onClick={()=>{
            setIsOpen({
                value: false,
                type: "",
                identifier: {
                    folderId:"",
                    cardId: "",
                }
            })
        }}>
            <MdOutlineClose/>
        </CloseButton>
    </Header>
    <Input>
        <input type='text' value={currentCard.title}/>
        <button>Update Title</button>
    </Input>
    </>
)
};

const Modal = () =>{
    const ModalFeatures = useContext(ModalContext)!;
    const setIsOpen = ModalFeatures?.setIsOpen!;
    const isOpen = ModalFeatures?.isOpen!;
    

    return(
        <ModalContainer>
            <ModalContent>
                {isOpen.type==="1" &&(
                    <EditCardModal setIsOpen={setIsOpen} isOpen={isOpen}/>
                )}
            </ModalContent>
        </ModalContainer>
    );
};
export default Modal;