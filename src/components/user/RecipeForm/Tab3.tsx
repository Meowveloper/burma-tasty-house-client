import { SetStateAction, useRef, useState } from "react";
import IRecipe from "../../../types/IRecipe";
import UserGeneralIngredients from "../general/Ingredients";
import GeneralValidators from "../../../utilities/GeneralValidators";
import RecipeValidator from "../../../utilities/RecipeValidator";
import updateObjectFields from "../../../utilities/updateObjectFields";
interface IProps {
    recipe: IRecipe;
    setRecipe: React.Dispatch<SetStateAction<IRecipe>>;
    pageStart: boolean;
    setPageStart: React.Dispatch<SetStateAction<boolean>>;
}
export default function Tab3(props: IProps) {
    const [newIngredient, setNewIngredient] = useState<string>("");
    const inputTag = useRef<HTMLInputElement>(null);
    const updateRecipeIngredients = updateObjectFields(props.recipe)("ingredients")
        
    return (
        <div>
            <div className="text-h2 font-bold mt-3 text-center">
                add <span className="dark:text-dark-text-highlight">INGREDIENTS</span> according to your recipe's necessity
            </div>
            <div className="mt-3 flex items-center gap-3">
                <input
                    ref={inputTag}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.setPageStart(false);
                        setNewIngredient(e.target.value);
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") addIngredient();
                        else return;
                    }}
                    value={newIngredient}
                    type="text"
                    className="dark:bg-dark-card rounded-small flex-1 px-3 py-2 outline-none"
                />
                <div onClick={addIngredient} className="text-logo dark:bg-dark-elevate w-[30px] h-[30px] leading-[30px] rounded-full text-center">
                    +
                </div>
            </div>
            {!props.pageStart && (!GeneralValidators.isText(newIngredient) || !GeneralValidators.greaterThanOrEqualTextLength(newIngredient, 3)) && <span className="text-red-500 font-bold">Each ingredient must have at least 3 characters and one alphabetic character!</span>}
            <div className="mt-3">{!!props.recipe.ingredients?.length && <UserGeneralIngredients ingredients={props.recipe.ingredients} removeIngredients={removeIngredients}></UserGeneralIngredients>}</div>
            {!RecipeValidator.ingredients(props.recipe.ingredients) && <span className="text-red-500 font-bold">Must contain al least 3 ingredients.</span>}
            <div className="bg-transparent my-5 w-[95%] mx-auto h-[1px]"></div>
        </div>
    );

    function addIngredient() {
        if (!GeneralValidators.isText(newIngredient) || !GeneralValidators.greaterThanOrEqualTextLength(newIngredient, 3)) return;
        const updatedIngredients: IRecipe["ingredients"] = addIngredients(props.recipe.ingredients || [], newIngredient);
        props.setRecipe(updateRecipeIngredients(updatedIngredients));
        setNewIngredient("");
        props.setPageStart(true);
    }

    function removeIngredients(id: number) {
        const updatedIngredients: IRecipe["ingredients"] = filterIngredients(props.recipe.ingredients, id);
        props.setRecipe(updateRecipeIngredients(updatedIngredients));
    }
}


// helper functions that does not need to use state (outside of the component function)
function filterIngredients(ingredients: IRecipe["ingredients"], id: number): IRecipe["ingredients"] {
    return ingredients.filter((_, index) => index !== id);
}

function addIngredients(ingredients : IRecipe['ingredients'], newIngredient : string) : IRecipe['ingredients'] {
    return [...ingredients, newIngredient];
}
