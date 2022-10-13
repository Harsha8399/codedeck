import React from "react";
import styled from "styled-components";

const StyledLeftPane = styled.div`
  position: fixed;
  width: 40%;
  top: 0;
  left: 0;
  height: 100vh;
  background: #221f20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 165px;
  margin-bottom: 1rem;
`;

const MainHeading = styled.div`
  font-size: 2.4rem;
  font-weight: 400;
  color: white;
  margin-bottom: 0.75rem;
  span{
    font-weight: 700;
  }
`;

const SubHeading = styled.div`
  font-size: 1.5rem;
  color: white;
  opacity: 75%;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const AddnewButton = styled.a`
    padding: 0.25rem 1rem;
    border-radius: 2rem;
    background: white;
    display: flex;
    align-items : center;
    justify-content: space-evenly;
    cursor: pointer;
    text-decoration: none;
    span{
        font-weight: 700;
        font-size: 2rem;
    }
    &.hover{
        opacity: 0.9;
    }
`;

const Leftpane = () => {
  return (
    <StyledLeftPane>
      <ContentContainer>
          <Logo src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png" alt="logo" />
            <MainHeading><span>Code</span> deck</MainHeading>
            <SubHeading>Code. Compile. Debug</SubHeading>
            <AddnewButton><span>+</span>Create New Playground</AddnewButton>
      </ContentContainer>
    </StyledLeftPane>
  );
};

export default Leftpane;
