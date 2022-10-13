import React from "react";
import Leftpane from "./Leftpane";
import Rightpane from "./Rightpane";
import styled from "styled-components";
import Modal from "../../components/Modal";
// import {useState} from "react";
import { ModalContext } from "../../context/ModalContext";
import {useContext} from "react";

const HomeScreenContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;    

`;

const Homescreen = () =>{
    const ModalFeatures = useContext(ModalContext)!;
    const isOpen = ModalFeatures?.isOpen;
    // const [isOpen,setIsOpen] = useState(false);

    return (
            <HomeScreenContainer>
                <Leftpane/>
                <Rightpane/>
                {isOpen && isOpen.value===true ? <Modal/> : <></>}
            </HomeScreenContainer>
    );
};

export default Homescreen;