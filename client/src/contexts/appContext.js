import { createContext, useState } from "react";

export const PageContext = createContext();
export const PageContextProvider = props =>
{
    const [page, setPage] = useState("SUBMISSIONS");

    return(
        <PageContext.Provider value={[page, setPage]}>
            {props.children}
        </PageContext.Provider>
    )
}   