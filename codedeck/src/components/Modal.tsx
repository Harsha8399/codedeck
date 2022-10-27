import React, { useContext } from "react";
import styled from "styled-components";
import {MdOutlineClose} from 'react-icons/md';
import {BiEditAlt} from "react-icons/bi";
import {ModalContext} from "../context/ModalContext";
import {PlaygroundContext} from "../context/PlaygroundContext";
import EditCardTitle from "./modalTypes/EditCardTitle";
import EditFolderTitle from "./modalTypes/EditFolderTitle";
import NewCard from "./modalTypes/NewCard";
import NewFolder from "./modalTypes/NewFolder";
import NewFolderAndPlayground from "./modalTypes/NewFolderAndPlayground";

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
export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const CloseButton = styled.button`
    background: transparent;
    outline: 0;
    border: 0;
    font-size: 2rem;
    cursor: pointer;

`;
export const Input = styled.div`
    display: flex;
    align-items: center;
    // box-sizing: border-box;
    justify-content: space-between;
    padding: 1.5rem 0;
    height: 5rem;
    gap: 2rem;
    // padding-bottom : 0,
    input{
        flex-grow: 1;
        height: 2rem;
    }
    button{
        background: #241f21;
        height: 1rem ;
        color: white;
        padding: 0.8rem 0.8rem ;
        display: flex;
        align-items: center;
        border-radius: 5%;
    }
    `;

const EditCardModal = ({
    closeModal,
    isOpen,
}:{
    closeModal: ()=>void;
    isOpen: any;
})=>{
    const PlaygroundFeatures = useContext(PlaygroundContext)!;
    const folders = PlaygroundFeatures.folders;
    console.log(isOpen);

    const currentFolder = folders[isOpen.identifier.folderId];
    const currentCard = currentFolder.items[isOpen.identifier.cardId];
    
return(
    <>
    <Header>
        <h2 className="Heading">Edit Cards title</h2>
        <CloseButton onClick={()=>{
            closeModal();
        }}>
            <MdOutlineClose/>
        </CloseButton>
    </Header>
    <Input>
        <input type='text' value={currentCard.title}/>
        <button>Update Title</button>
    </Input>
    </>
);
};

export interface ModalProps{
    closeModal:()=>void;
    identifier: {
        folderId: string;
        cardId: string;
    };
}

const Modal = () =>{
    const ModalFeatures = useContext(ModalContext)!;
    const {closeModal } = ModalFeatures;
    const isOpen = ModalFeatures?.isOpen!;
    

    return(
        <ModalContainer>
            <ModalContent>
                {isOpen.type==="1" &&(
                    <EditCardTitle closeModal={closeModal} identifier={isOpen.identifier}/>
                )}
                {isOpen.type==="2" &&(
                    <EditFolderTitle closeModal={closeModal} identifier={isOpen.identifier}/>
                )}
                {isOpen.type==="3" &&(
                    <NewCard closeModal={closeModal} identifier={isOpen.identifier}/>
                )}
                {isOpen.type==="4" &&(
                    <NewFolder closeModal={closeModal} identifier={isOpen.identifier}/>
                )}
                {isOpen.type==="5" &&(
                    <NewFolderAndPlayground closeModal={closeModal} identifier={isOpen.identifier}/>
                )}
            </ModalContent>
        </ModalContainer>
    );
};
export default Modal;