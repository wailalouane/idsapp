import React,{createContext, useContext, useState} from 'react';

const StateContext=createContext();
const initialState={
    chat: false,
    cart: false, 
    userProfil:false,
    notification: false,
}
export const ContextProvider=({children})=>{
    const [ActiveMenu,setActiveMenu]=useState(true);
    return (
        <StateContext.Provider
        value={{ActiveMenu,}}
        >
            {children}
        </StateContext.Provider> 
        )
}
export const useStateContext = () => useContext (StateContext);