import React, { createContext, useState } from "react"
import ITag from "../types/ITag"

interface ITagsToDeleteContext {
    tagsToDelete : Array<ITag['_id']>
    setTagsToDelete : React.Dispatch<React.SetStateAction<Array<ITag['_id']>>>
}
export const TagsToDeleteContext = createContext<ITagsToDeleteContext>({
    tagsToDelete : [],
    setTagsToDelete : () => {}
});

export function TagsToDeleteContextProvider({ children } : {children : React.ReactNode}) {
    const [tagsToDelete, setTagsToDelete] = useState<Array<ITag['_id']>>([]);
    return (
        <TagsToDeleteContext.Provider value={{tagsToDelete, setTagsToDelete}}>
            {children}
        </TagsToDeleteContext.Provider>
    );
}

