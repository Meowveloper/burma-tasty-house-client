import { useState } from "react";
import IRecipe from "../../../types/IRecipe";
import UserGeneralTags from "../general/Tags";
import GeneralValidators from "../../../utilities/GeneralValidators";
import RecipeValidator from "../../../utilities/RecipeValidator";
import updateObjectFields from "../../../utilities/updateRecipeField";
interface IProps {
    recipe: IRecipe;
    setRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
    pageStart: boolean;
    setPageStart: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Tab2(props: IProps) {
    const [newTag, setNewTag] = useState<string>("");
    return (
        <div>
            <div className="text-h2 font-bold mt-3 text-center">
                add <span className="dark:text-dark-text-highlight">TAGS</span> to your recipe so that others can find it easily
            </div>
            <div className="mt-3 flex items-center gap-3">
                <input
                    onChange={handleNewTagChange}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") addTag();
                        else return;
                    }}
                    value={newTag}
                    type="text"
                    className="dark:bg-dark-card rounded-small flex-1 px-3 py-2 outline-none"
                />
                <div onClick={addTag} className="text-logo dark:bg-dark-elevate w-[30px] h-[30px] leading-[30px] rounded-full text-center">
                    +
                </div>
            </div>
            {!props.pageStart && (!GeneralValidators.isText(newTag) || !GeneralValidators.greaterThanOrEqualTextLength(newTag, 2)) && <span className="text-red-500 font-bold">Tag must contain at least 2(TWO) characters and must contain at least one alphabetic character</span>}
            <div className="mt-3">{!!props.recipe?.tags?.length && <UserGeneralTags tags={props.recipe.tags} removeTag={removeTag}></UserGeneralTags>}</div>
            {!RecipeValidator.tags(props.recipe.tags) && <span className="text-red-500 font-bold">Must contain at least one tag!</span>}
            <div className="bg-transparent my-5 w-[95%] mx-auto h-[1px]"></div>
        </div>
    );

    function addTag() {
        if (!GeneralValidators.isText(newTag) || !GeneralValidators.greaterThanOrEqualTextLength(newTag, 2)) return;
        const newTags = props.recipe.tags ? [...props.recipe.tags, newTag] : [newTag];
        props.setRecipe(updateObjectFields(props.recipe, "tags", newTags));
        setNewTag("");
        props.setPageStart(true);
    }
    function handleNewTagChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);
        setNewTag(e.target.value);
    }
    function removeTag(id: string | number) {
        const updatedTags = filterTags(props.recipe.tags, id);
        props.setRecipe(updateObjectFields(props.recipe, "tags", updatedTags));
    }

    function filterTags(tags: IRecipe['tags'], id: string | number): IRecipe['tags'] {
    return tags.filter((tag, index) => {
        if (typeof id === "string" && typeof tag !== "string") return tag._id !== id;
        return index !== id;
    });
}
}
