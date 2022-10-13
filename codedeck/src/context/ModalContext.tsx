import React,{ createContext,useState } from "react";


interface PopupFields{
    value: boolean,
    type: string,
    identifier:{
        folderId: string,
        cardId: string,
    },
}

interface ModalContextType{
    isOpen : PopupFields,
    setIsOpen : (isOpen: PopupFields)=> void,
}


export const ModalContext = createContext<ModalContextType| null>(null);

export default function ModalProvider({children}:{children: any}){

    const initialPopupFields:PopupFields={
        value: true,
        type: "",
        identifier:{
            folderId: "",
            cardId: "",
        },
    };

    const [isOpen,setIsOpen] = useState<PopupFields>({...initialPopupFields});

    const makeAvailableGlobally:ModalContextType={
        isOpen: isOpen,
        setIsOpen: setIsOpen,
    }
    return(
        <ModalContext.Provider value={makeAvailableGlobally}>
            {children}
        </ModalContext.Provider>
    );
};



