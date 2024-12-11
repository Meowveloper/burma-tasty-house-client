import { useEffect, useMemo, useState } from "react";
import ITag from "../../types/ITag";
import axios from "../../utilities/axios";
import RecipesWithPagination from "./RecipesWithPagination";

interface IProps {
    sort : string;
}
export default function Browse(props : IProps) {
    const [tags, setTags] = useState<ITag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTag, setActiveTag] = useState<ITag | null>(null);

    const fetchTags = useMemo(() => getFetchTagsFunction(setTags, setLoading, setActiveTag), [setTags, setLoading, setActiveTag]);

    useEffect(() => {
        console.log("checking infinite loop from pages/user/Browse.tsx");
        fetchTags();
    }, [fetchTags]);

    if (loading) return <div>Loading.....</div>;
    console.log("active tag", activeTag);
    return (
        <div>
            <div className="text-h2 font-bold">Search With Tags</div>
            <div className="grid grid-cols-4 tablet:grid-cols-6 desktop:grid-cols-8 gap-2 h-[100px] bg-dark-elevate p-4 overflow-y-scroll">
                {!!tags.length &&
                    tags.map((tag: ITag) => (
                        <div onClick={() => { setActiveTag(tag); }} key={tag._id} className={activeTag?._id === tag._id ? "dark:bg-dark-card rounded-md p-2 border border-dark-border cursor-pointer" : "dark:bg-dark-secondary-card rounded-md p-2 cursor-pointer"}>
                            {tag.name}
                        </div>
                    ))}
            </div>

            <div className="text-h2 font-bold my-4">Recipes</div>
            { !!activeTag && (
                <RecipesWithPagination sort={props.sort} needAuth={false} tagId={activeTag._id}></RecipesWithPagination>
            ) }
        </div>
    );
}

function getFetchTagsFunction(setTags: React.Dispatch<React.SetStateAction<ITag[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setActiveTag: React.Dispatch<React.SetStateAction<ITag | null>>): () => Promise<void> {
    return async function (): Promise<void> {
        try {
            setLoading(true);
            const res = await axios.get("/tags");
            console.log(res.data.data);
            setTags(res.data.data);
            setActiveTag(res.data.data[0]);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
}
