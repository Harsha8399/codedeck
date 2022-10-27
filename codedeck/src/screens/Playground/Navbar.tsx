import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const NavbarContainer = styled.div`
    height: 4.5rem;
    background: #241f21;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavbarContent = styled.button`
    display: flex;
    align-items: center;
    gap: 0.9rem;
    background: transparent;
    border: 0;
    outline: 0;
    img{
        width: 45px;
    }
    `
const MainHeading = styled.div`
font-size: 1.9rem;
font-weight: 400;
color: white;
span{
    font-weight: 700;
}
`;



const Navbar = () => {
    const navigate = useNavigate();

  return (
    <NavbarContainer>
        <NavbarContent onClick={()=>{navigate("/")}}>
            <img src='https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png' alt="logo" />
            <MainHeading><span>Code</span>Deck</MainHeading>
        </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar