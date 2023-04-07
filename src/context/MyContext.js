import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const MyContext = createContext();






export default function ContextProvider({ children }) {

    const [alergia, setAlergia] = useState(null);


    return (
        <MyContext.Provider value={{alergia,setAlergia}}>
            {children}
        </MyContext.Provider>

    )

}
