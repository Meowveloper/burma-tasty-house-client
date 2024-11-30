import { createContext, useState } from "react";
import IStep from "../types/IStep";

interface IStepsToDeleteContext {
    stepsToDelete : Array<IStep['_id']>,
    setStepsToDelete : React.Dispatch<React.SetStateAction<Array<IStep['_id']>>>
}

export const StepsToDeleteContext = createContext<IStepsToDeleteContext>({
    stepsToDelete : [],
    setStepsToDelete : () => {}
});

export function StepsToDeleteContextProvider({children} : {children : React.ReactNode}) {
    const [stepsToDelete, setStepsToDelete] = useState<Array<IStep['_id']>>([]);
    console.log("steps to delete context", stepsToDelete);
    return (
        <StepsToDeleteContext.Provider value={{stepsToDelete, setStepsToDelete}}>
            {children}
        </StepsToDeleteContext.Provider>
    );
}