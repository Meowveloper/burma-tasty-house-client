import React, { useContext, useEffect, useMemo, useState } from "react";
import IRecipe from "../../types/IRecipe";
import axios from "../../utilities/axios";
import RecipeCard from "../../components/user/general/RecipeCard";
import { AuthContext } from "../../contexts/AuthContext";
import RecipeDetail from "./RecipeDetail";
import { deleteRecipeInBackendAndRemoveRecipeFromStates } from "../../utilities/generalHelperFunctions";
enum EnumRoutesForFetchingRecipesWithLimits {
    latest = "/recipes/latest",
    highestView = "/recipes/highest-view",
    highestComment = "/recipes/highest-comment",
    peopleYouFollowedLatestRecipes = "/recipes/people-you-followed/latest"
}
export default function UserHome() {
    const authContext = useContext(AuthContext);
    const [latestRecipes, setLatestRecipes] = useState<IRecipe[]>([]);
    const [highestViewRecipes, setHighestViewRecipes] = useState<IRecipe[]>([]);
    const [ highestCommentRecipes, setHighestCommentRecipes ] = useState<IRecipe[]>([]);
    const [latestRecipesLoading, setLatestRecipesLoading] = useState<boolean>(false);
    const [highestViewRecipesLoading, setHighestViewRecipesLoading] = useState<boolean>(false);
    const [ highestCommentRecipesLoading, setHighestCommentRecipesLoading ] = useState<boolean>(false);

    const [recipeToShow, setRecipeToShow] = useState<IRecipe | null>(null);

    const limit: Readonly<number> = 5;

    const addViewsToRecipes = useMemo(getAddViewsToRecipesFunction, [recipeToShow, authContext.user]);

    useEffect(() => {
        console.log("checking infinite loop from pages/user/Home.tsx");
        fetchLatestRecipes(); // limit = 5
        fetchHighestViewRecipes(); // limit = 5
        fetchHighestCommentedRecipes(); // limit = 5


        
        addViewsToRecipes();
    }, [addViewsToRecipes]);



    const deleteRecipeAndRemoveFromHighestAndLatestRecipes = deleteRecipeInBackendAndRemoveRecipeFromStates(recipeToShow?._id, [setLatestRecipes, setHighestViewRecipes], () => setRecipeToShow(null));

    if (recipeToShow) return <RecipeDetail recipeToShow={recipeToShow} user={authContext.user} setRecipeToShow={setRecipeToShow} deleteRecipe={deleteRecipeAndRemoveFromHighestAndLatestRecipes}></RecipeDetail>;

    return (
        <div className="space-y-5">
            {/* latest recipes */}
            <div>
                <div className="flex items-center gap-5">
                    <div className="text-h1">Latest Recipes</div>
                    <div>{`>>`}</div>
                    <div className="cursor-pointer underline">See All Recipes</div>
                </div>
                <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <div className="flex flex-row items-center gap-5 p-4">
                        {latestRecipesLoading && <div>Loading.....</div>}
                        {!!latestRecipes.length && !latestRecipesLoading && latestRecipes.map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}
                    </div>
                </div>
            </div>
            {/* latest recipes end */}

            {/* highest view recipes */}
            <div>
                <div className="flex items-center gap-5">
                    <div className="text-h1">Popular by Views</div>
                    <div>{`>>`}</div>
                    <div className="cursor-pointer underline">See more</div>
                </div>
                <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <div className="flex flex-row items-center gap-5 p-4">
                        {highestViewRecipesLoading && <div>Loading.....</div>}
                        {!!highestViewRecipes.length && !highestCommentRecipesLoading && highestViewRecipes.map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}
                    </div>
                </div>
            </div>
            {/* highest view recipes end */}


            {/* popular by comments recipes */}
            <div>
                <div className="flex items-center gap-5">
                    <div className="text-h1">Popular by Comments</div>
                    <div>{`>>`}</div>
                    <div className="cursor-pointer underline">See more</div>
                </div>
                <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <div className="flex flex-row items-center gap-5 p-4">
                        {highestCommentRecipesLoading && <div>Loading.....</div>}
                        {!!highestCommentRecipes.length && !highestCommentRecipesLoading && highestCommentRecipes.map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}
                    </div>
                </div>
            </div>
            {/* popular by comments recipes end */}
        </div>
    );

    async function fetchLatestRecipes() {
        setLatestRecipesLoading(true);
        const getLatestRecipesWithLimit = getRecipesWithLimit(EnumRoutesForFetchingRecipesWithLimits.latest);

        getLatestRecipesWithLimit(limit)
            .then(res => {
                setLatestRecipes(res);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLatestRecipesLoading(false);
            });
    }


    async function fetchHighestViewRecipes() {
        
        setHighestViewRecipesLoading(true);
        const getHighestViewRecipesWithLimit = getRecipesWithLimit(EnumRoutesForFetchingRecipesWithLimits.highestView);
        getHighestViewRecipesWithLimit(limit)
            .then(res => {
                setHighestViewRecipes(res);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setHighestViewRecipesLoading(false);
            });
    }

    async function fetchHighestCommentedRecipes() {
        setHighestCommentRecipesLoading(true);
        const getHighestCommentedRecipesWithLimit = getRecipesWithLimit(EnumRoutesForFetchingRecipesWithLimits.highestComment);
        getHighestCommentedRecipesWithLimit(limit)
            .then(res => {
                setHighestCommentRecipes(res);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setHighestCommentRecipesLoading(false);
            });
    }


    function getAddViewsToRecipesFunction () : () => void {
        return function () {
            if (recipeToShow && authContext.user && authContext.user._id !== (typeof recipeToShow.user === "string" ? recipeToShow.user : recipeToShow.user._id)) {
                setLatestRecipes(prev => findInRecipeArrayAndAddOneView(prev, recipeToShow._id));
                setHighestViewRecipes(prev => findInRecipeArrayAndAddOneView(prev, recipeToShow._id));
                console.log("added view in client");
            }
        }
    }
}

// outside
function getRecipesWithLimit(url: EnumRoutesForFetchingRecipesWithLimits): (limit: number) => Promise<IRecipe[]> {
    return async function (limit: number): Promise<IRecipe[]> {
        try {
            const recipes = await axios.get(`${url}?limit=${limit}`).then(res => {
                return res.data.data;
            });
            if (recipes) return recipes;
            else throw new Error("recipes not found");
        } catch (e) {
            console.log(e);
            throw new Error((e as Error).message);
        }
    };
}

function findInRecipeArrayAndAddOneView(recipes: IRecipe[], _id: IRecipe["_id"]) {
    const newRecipes = recipes.map((item: IRecipe) => {
        if (item._id === _id) return { ...item, views: item.views + 1 };
        else return item;
    });
    return newRecipes;
}
