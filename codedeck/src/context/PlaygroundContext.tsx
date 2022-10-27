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
    savePlayground:(
      folderId: string,cardId: string,newCode: string, newLanguage: string
    )=> void;
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

export const languageMap:{
  [key: string]:{
    id: number;
    defaultCode: string;
  };
}={
  "c++":{
    id: 54,
    defaultCode:"#include <iostream>\n"+"\n"+
    "int main() {\n"+
    "    //your code here\n"+
    "    return 0;\n"+
    "}"
  },
  python:{
    id:71,
    defaultCode:"# python code here"
  },
  javascript:{
    id:63,
    defaultCode:"// javascript code here"
  },
  java:{
    id: 62,
    defaultCode: "Your java code here",
  },
};

const initialItems = {
  [uuid()]: {
    title: "Folder Title 1",
    items: {
      [uuid()]: {
        title: "Stack Implementation",
        language: "C++",
        code:languageMap["c++"].defaultCode,
      },
      [uuid()]: {
        title: "Queue Implementation",
        language: "C++",
        code:languageMap["c++"].defaultCode,
      },
      [uuid()]: {
        title: "XYZ Implementation",
        language: "C++",
        code:languageMap["c++"].defaultCode,
      },
    },
  }, 
};

const PlaygroundProvider = ({children}:{children: any}) => {
  const [folders,setFolders]=useState(()=>{
    let localData = JSON.parse(
      localStorage.getItem("playground-data") as string
    );
    localData = localData===null || Object.keys(localData).length===0?null:localData;
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
  };

  //creating newplayground

  const createNewPlayground = (folderId:string,cardTitle:string,cardLanguage:string)=>{
    setFolders((oldstate:any)=>{
      const newState = {...oldstate};
      newState[folderId].items[uuid()]={
        title: cardTitle,
        language: cardLanguage,
        code: languageMap[cardLanguage].defaultCode,
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
            code: languageMap[cardLanguage].defaultCode,
          }
        }
      }
      return newState;
    })
  }

  const savePlayground = (
    folderId: string,
    cardId: string,
    newCode: string,
    newLanguage: string
  )=>{
    setFolders((oldState: any)=>{
      const newState={...oldState};
      newState[folderId].items[cardId].code = newCode;
      newState[folderId].items[cardId].language = newLanguage;
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
    savePlayground: savePlayground,
};

return(
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
        {children}
    </PlaygroundContext.Provider>
)
}

export default PlaygroundProvider;