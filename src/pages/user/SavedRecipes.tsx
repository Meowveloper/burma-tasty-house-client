import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "../../utilities/axios";
import IRecipe from "../../types/IRecipe";
import RecipeCard from "../../components/user/general/RecipeCard";
import { AuthContext } from "../../contexts/AuthContext";
import RecipeDetail from "./RecipeDetail";
import { deleteRecipeInBackendAndRemoveRecipeFromStates } from "../../utilities/generalHelperFunctions";
export default function SavedRecipes() {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [recipeToShow, setRecipeToShow] = useState<IRecipe | null>(null);
    const fetchRecipes = useMemo(() => getFetchRecipesFunction(setRecipes, setLoading), [setRecipes, setLoading]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log("checking infinite loop from pages/user/SavedRecipes.tsx");
        fetchRecipes();
    }, [fetchRecipes, authContext.user?.saves?.length]);

    const deleteRecipeAndRemoveFromAllRecipesLists = deleteRecipeInBackendAndRemoveRecipeFromStates(recipeToShow?._id, [setRecipes], () => setRecipeToShow(null));
    if (recipeToShow) return <RecipeDetail recipeToShow={recipeToShow} setRecipeToShow={setRecipeToShow} deleteRecipe={deleteRecipeAndRemoveFromAllRecipesLists}></RecipeDetail>;

    return (
        <div>
            <div className="text-h2 font-bold mb-2">Your Saved Recipes</div>
            <div className="grid grid-cols-2 desktop:grid-cols-4 tablet:grid-cols-3 gap-4 mt-5">
                {loading && <div>Loading.....</div>}
                {!recipes.length && !loading && <div className="col-span-2 tablet:col-span-3 desktop:col-span-4">No recipes found.., you haven't saved any recipes or the recipes you saved are deleted by the owner...</div>}
                {!!recipes.length && !loading && recipes.map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}
            </div>
        </div>
    );
}

function getFetchRecipesFunction(setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>): () => Promise<void> {
    return async function () {
        try {
            setLoading(true);
            const res = await axios.get("/recipes/saved");
            console.log(res.data.data);
            setRecipes(res.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
}

