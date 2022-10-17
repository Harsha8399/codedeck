import React, { useEffect } from 'react'
import {createContext,useState} from 'react';
import {v4 as uuid} from "uuid";

interface PlaygroundContextType{
    folders: any;
    setFolders: any;
    createNewFolder: (folderTitle: string) => void;
    createNewPlayground: (folderId:string,cardId:string,cardLanguage:string)=>void;
    createNewFolderAndPlayground:(folderTitle:string,cardTitle:string,cardLanguage:string)=>void;
    editCardTitle: (
      folderId: string,
      cardId: string,
      newCardTitle: string
    ) => void;
    editFolderTitle: (folderId: string, newFolderTitle: string) => void;
    deleteCard: (folderId: string, cardId: string) => void;
    deleteFolder: (folderId: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextType|null>(null);

export interface FolderT{
  title: string;
  items:{
    [key: string]:{
      title: string;
      language : string;
    }; 
  };
};

export interface FolderType{
  [key:string]:FolderT;
}

const initialItems = {
  [uuid()]: {
    title: "Folder Title 1",
    items: {
      [uuid()]: {
        title: "Stack Implementation",
        language: "C++",
      },
      [uuid()]: {
        title: "Queue Implementation",
        language: "C++",
      },
      [uuid()]: {
        title: "XYZ Implementation",
        language: "C++",
      },
    },
  },
  [uuid()]: {
    title: "Folder Title 2",
    items: {
      [uuid()]: {
        title: "1 Implementation",
        language: "C++",
      },
      [uuid()]: {
        title: "2 Implementation",
        language: "C++",
      },
      [uuid()]: { 
        title: "3 Implementation",
        language: "C++",
      },
    },
  }
}

const PlaygroundProvider = ({children}:{children: any}) => {
  const [folders,setFolders]=useState(()=>{
    const localData = JSON.parse(
      localStorage.getItem("playground-data") as string
    );
    return localData || initialItems;
  });

  useEffect(()=>{
    localStorage.setItem("playground-data",JSON.stringify(folders));
  },[folders]);

  //creating new folder
  
  const createNewFolder = (folderTitle:string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      newState[uuid()]={
         title: folderTitle,
         items: {}, 
      };
      return newState;
    });
  }

  //creating newplayground

  const createNewPlayground = (folderTitle:string,cardTitle:string,cardLanguage:string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      newState[uuid()]={
        title: folderTitle,
        items:{
          [uuid()]:{
            title : cardTitle,
            language: cardLanguage,
          },
        },
      };
      return newState;
    });
  };

  const editCardTitle = (folderId: string,cardId: string , newCardTitle: string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      newState[folderId].items[cardId].title = newCardTitle;
      return newState;
    })
  };

  const editFolderTitle = (folderId:string,newFolderTitle:string)=>{
    setFolders((oldstate: any)=>{
      const newState = {...oldstate};
      newState[folderId].title = newFolderTitle;
      return newState;
    })
  };

  const deleteCard=(folderId:string,cardId:string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      delete newState[folderId].items[cardId];
      return newState;
    });
  }

  const deleteFolder = (folderId:string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      delete newState[folderId];
      return newState;
    })
  }

  const createNewFolderAndPlayground=(folderTitle:string,cardTitle:string,cardLanguage:string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      newState[uuid()]={
        title: folderTitle,
        items:{
          [uuid()]:{
            title: cardTitle,
            language: cardLanguage,
          }
        }
      }
      return newState;
    })
  }


const makeAvailableGlobally: PlaygroundContextType={
    folders: folders,
    setFolders: setFolders,
    createNewFolder : createNewFolder,
    createNewPlayground: createNewPlayground,
    createNewFolderAndPlayground: createNewFolderAndPlayground,
    editCardTitle: editCardTitle,
    editFolderTitle: editFolderTitle,
    deleteCard: deleteCard,
    deleteFolder: deleteFolder,
};

return(
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
        {children}
    </PlaygroundContext.Provider>
)
}

export default PlaygroundProvider;