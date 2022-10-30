import React, { useContext ,useEffect} from "react";
import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
// import {BiEditAlt} from "react-icons/bi";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

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
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  position: absolute;
  width: 60%;
  top: 0;
  right: 0;
  height: 100vh;
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
  margin-bottom: 2rem;
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
  cursor: pointer;
  transition: all 0.1s ease;
  &:hover {
    opacity: 0.75;
  }
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
  padding-right: 1rem;
`;

const FolderButtons = styled.div`
  display: flex;
  align-items: center;
`;



const Rightpane = () => {
  const makeAvailableGlobally = useContext(ModalContext)!;
  const { openModal } = makeAvailableGlobally;
  console.log(openModal);

  const PlaygroundFeatures = useContext(PlaygroundContext)!;
  const Folders = PlaygroundFeatures?.folders;
  const { deleteFolder, deleteCard } = PlaygroundFeatures;
  const navigate = useNavigate();

  const { theme,setTheme } = useContext(ThemeContext)! || {};


const changeTheme=()=>{
  console.log("Darkmode working");
  const newTheme={
    background: "black",
    color: "white",
  }
  setTheme(newTheme);
  console.log(theme);
}
  

  return (
    <StyledRightPane>
      {/* console.log(openModal); */}
      <Header variant="main">
        <Heading size="large">
          My <span>Playground</span>
        </Heading>
        {/* <button onClick={()=>changeTheme()}>Dark Mode</button> */}
        <input type="checkbox" onChange={changeTheme} value="Dark"/><label>Dark mode</label>

        {openModal && (
          <AddButton
            onClick={() => {
              openModal({
                value: true,
                type: "4",
                identifier: {
                  folderId: "",
                  cardId: "",
                },
              });
            }}
          >
            <span>+</span>New folder
          </AddButton>
        )}
      </Header>

      {Object.entries(Folders).map(
        ([folderId, folder]: [folderId: string, folder: any]) => (
          <Folder>
            <Header variant="folder">
              <Heading size="small">{folder.title}</Heading>
              <FolderButtons>
                <Icons>
                  <IoTrash
                    onClick={() => {
                      // DELETE FOLDER
                      deleteFolder(folderId);
                    }}
                  />
                  <FaEdit
                    onClick={() => {
                      openModal({
                        value: true,
                        type: "2",
                        identifier: {
                          folderId: folderId,
                          cardId: "",
                        },
                      });
                    }}
                  />
                </Icons>
                <AddButton
                  onClick={() => {
                    openModal({
                      value: true,
                      type: "3",
                      identifier: {
                        folderId: folderId,
                        cardId: "",
                      },
                    });
                  }}
                >
                  <span>+</span> New Playground
                </AddButton>
              </FolderButtons>
            </Header>

            <CardContainer>
              {Object.entries(folder.items).map(
                ([cardId, card]: [cardId: string, card: any]) => (
                  <PlaygroundCard
                    onClick={() => {
                      navigate(`/code/${folderId}/${cardId}`);
                    }}
                  >
                    <img src="/logo-small.png" alt="" />
                    <CardContent>
                      <h5>{card.title}</h5>
                      <p>Language: {card.language}</p>
                    </CardContent>
                    <Icons
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <IoTrash
                        onClick={() => {
                          // DELETE CARD
                          deleteCard(folderId, cardId);
                        }}
                      />
                      <FaEdit
                        onClick={() => {
                          openModal({
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
                )
              )}
            </CardContainer>
          </Folder>
        )
      )}
    </StyledRightPane>
  );
};

export default Rightpane;
