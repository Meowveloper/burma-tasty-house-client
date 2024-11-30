import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "../../utilities/axios";
import IUser from "../../types/IUser";
import IRecipe from "../../types/IRecipe";
import RecipeCard from "../../components/user/general/RecipeCard";
import RecipeDetail from "./RecipeDetail";
import { deleteRecipeInBackendAndRemoveRecipeFromStates } from "../../utilities/generalHelperFunctions";
export default function Profile(): JSX.Element {
    const authContext = useContext(AuthContext);
    const params = useParams();
    const userId = params.id;
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [recipeToShow, setRecipeToShow] = useState<IRecipe | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        setLoading(true);
        console.log("checking infinite loop from pages/user/Profile.tsx");
        axios
            .get(`/users/user-with-recipe/${userId}`)
            .then(res => {
                console.log(res);
                setUser(res.data.data);
                setRecipes(res.data.data.recipes);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div>Loading.....</div>;

    const deleteRecipeAndRemoveFromUserRecipes = deleteRecipeInBackendAndRemoveRecipeFromStates(recipeToShow?._id, [setRecipes], () => { setRecipeToShow(null); });

    if (recipeToShow) return <RecipeDetail recipeToShow={recipeToShow} user={authContext.user} setRecipeToShow={setRecipeToShow} deleteRecipe={deleteRecipeAndRemoveFromUserRecipes}/>;

    return (
        <div>
            <div className="py-8 px-8 max-w-sm  bg-white dark:bg-dark-card rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mobile:mx-auto tablet:mx-0">
                <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0 w-24" src="/image-placeholder.jpg" alt="Woman's Face" />
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg  font-semibold">
                            {user.name}'s Profile {user._id === authContext.user?._id && <span className="font-bold dark:text-dark-text-highlight">(You)</span>}
                        </p>
                        <p className="text-slate-500 font-medium">
                            {user.email}
                        </p>
                    </div>
                    <button className="px-4 py-1 text-sm text-dark-text-highlight font-semibold rounded-full border border-dark-border hover:text-white hover:bg-dark-secondary-card hover:border-transparent">
                        Follow
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <div className="text-h1 font-bold mb-4">Your Recipes</div>
                <div className="grid grid-cols-2 desktop:grid-cols-3 gap-4">{!!recipes?.length && (recipes as IRecipe[]).map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}</div>
            </div>
        </div>
    );
}
