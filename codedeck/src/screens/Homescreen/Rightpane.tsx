import React, { useContext } from "react";
import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
// import {BiEditAlt} from "react-icons/bi";
import { ModalContext } from "../../context/ModalContext";

interface HeaderProps {
  readonly variant: string;
}
interface HeadingProps {
  readonly size: string;
}

const Header = styled.div<HeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: ${(props) => (props.variant === "main" ? "2rem" : "1rem")}
    &::after{
        position: absolute;
        content:"";
        bottom: -1.25rem;
        width: 100%;
        height: 2px;
        background: rgba(0,0,0,0.25);
        display: ${(props) => (props.variant === "main" ? "block" : "none")};
    }
`;

const StyledRightPane = styled.div`
  padding: 2rem;
  background: #fafafa;
  position: absolute;
  width: 60%;
  top: 0;
  right: 0;
`;
const Heading = styled.h3<HeadingProps>`
  font-weight: 400;
  font-size: ${(props) => (props.size === "large" ? "1.8rem" : "1.5rem")};
  span {
    font-weight: 700;
  }
`;
const AddButton = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: transparent;
  outline: 0;
  border: 0;
  font-size: 1.1rem;
  cursor: pointer;
  span {
    font-size: 1.75rem;
    font-weight: 700;
  }
  transition: all 0.25s ease;
  &:hover {
    opacity: 0.75;
    scale: 1.1;
  }
`;

const Folder = styled.div`
  margin-top: 0.5rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 0.5rem;
  row-gap: 2rem;
`;
const PlaygroundCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
  box-shadow: 0px 0px 12px -3px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  img {
    width: 60px;
    height: 60px;
  }
`;
const CardContent = styled.div`
  flex-grow: 1;
  h5 {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.25rem;
`;

const Rightpane = () => {
  const makeAvailableGlobally = useContext(ModalContext)!;
  const setIsOpen = makeAvailableGlobally?.setIsOpen;

  const Folders = {
    ["1"]: {
      title: "Title 1",
      items: {
        ["item1"]: {
          title: "Stack Implementation",
          language: "C++",
        },
        ["item2"]: {
          title: "Queue Implementation",
          language: "C++",
        },
        ["item3"]: {
          title: "XYZ Implementation",
          language: "C++",
        },
      },
    },
    ["2"]: {
      title: "Folder Title 2",
      items: {
        ["item4"]: {
          title: "1 Implementation",
          language: "C++",
        },
        ["item5"]: {
          title: "2 Implementation",
          language: "C++",
        },
        ["item6"]: {
          title: "3 Implementation",
          language: "C++",
        },
      },
    },
  };

  return (
    <StyledRightPane>
      <Header variant="main">
        <Heading size="large">
          My <span>Playground</span>
        </Heading>
        <AddButton>New folder</AddButton>
      </Header>

      {Object.entries(Folders).map(([folderId, folder]) => (
        <Folder>
          <Header variant="folder">
            <Heading size="large">Data Structures</Heading>
            <AddButton>
              <span>+</span>New Playground
            </AddButton>
          </Header>
          <CardContainer>
            {Object.entries(folder.items).map(([cardId, card]) => (
              <PlaygroundCard>
                <img
                  src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png"
                  alt="logo"
                />
                <CardContent>
                  <h5>{card.title}</h5>
                  <p>Language:{card.language}</p>
                </CardContent>
                <Icons>
                  <IoTrash />
                  <FaEdit
                    onClick={() => {
                      setIsOpen({
                        value: true,
                        type: "1",
                        identifier: {
                          folderId: folderId,
                          cardId: cardId,
                        },
                      });
                    }}
                  />
                </Icons>
              </PlaygroundCard>
            ))}
          </CardContainer>
        </Folder>
      ))}
    </StyledRightPane>
  );
};

export default Rightpane;
