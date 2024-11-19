import React, { useContext, useEffect, useState } from "react";
import IRecipe from "../../types/IRecipe";
import axios from "../../utilities/axios";
import Preview from "../../components/user/RecipeForm/Preview";
import RecipeCard from "../../components/user/general/RecipeCard";
import { AuthContext } from "../../contexts/AuthContext";

enum EnumRoutesForFetchingRecipesWithLimits {
    latest = "/recipes/latest",
    highestView = "/recipes/highest-view",
}
export default function UserHome() {
    const authContext = useContext(AuthContext);
    const [latestRecipes, setLatestRecipes] = useState<IRecipe[]>([]);
    const [ highestViewRecipes, setHighestViewRecipes ] = useState<IRecipe[]>([]);
    const [latestRecipesLoading, setLatestRecipesLoading] = useState<boolean>(false);
    const [highestViewRecipesLoading, setHighestViewRecipesLoading] = useState<boolean>(false);
    const [recipeToShow, setRecipeToShow] = useState<IRecipe | null>(null);

    useEffect(() => {
        console.log("checking infinite loop from pages/user/Home.tsx for latest recipes");
        setLatestRecipesLoading(true);
        const getLatestRecipesWithLimit = getRecipesWithLimit(EnumRoutesForFetchingRecipesWithLimits.latest);
        getLatestRecipesWithLimit(5)
            .then(res => {
                setLatestRecipes(res);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLatestRecipesLoading(false);
            });
    }, []);


    useEffect(() => {
        console.log("checking infinite loop from pages/user/Home.tsx for highest view recipes");
        setHighestViewRecipesLoading(true);
        const getHighestViewRecipesWithLimit = getRecipesWithLimit(EnumRoutesForFetchingRecipesWithLimits.highestView);
        getHighestViewRecipesWithLimit(5)
            .then(res => {
                setHighestViewRecipes(res);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setHighestViewRecipesLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log('checking infinite loop from pages/user/Home.tsx for adding views to recipes');
        if(recipeToShow && authContext.user && authContext.user._id !== (typeof recipeToShow.user === 'string' ? recipeToShow.user : recipeToShow.user._id)) {
            setLatestRecipes(prev => findInRecipeArrayAndAddOneView(prev, recipeToShow._id));
            setHighestViewRecipes(prev => findInRecipeArrayAndAddOneView(prev, recipeToShow._id));
            console.log('added view in client');
        }
    }, [recipeToShow, authContext.user])


    if (recipeToShow)
        return (
            <div className="w-full">
                {Preview(recipeToShow)(true)()()()()}
                <button
                    onClick={() => {
                        setRecipeToShow(null);
                    }}
                    className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small"
                >
                    Back
                </button>
            </div>
        );

    return (
        <div className="space-y-5">
            {/* latest recipes */}
            <div>
                <div className="flex items-center gap-5">
                    <div className="text-h1">Latest Recipes</div>
                    <div>{`>>`}</div>
                    <div>See All Recipes</div>
                </div>
                <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <div className="flex flex-row items-center gap-5 p-4">
                        {latestRecipesLoading && <div>Loading.....</div>}
                        {!!latestRecipes.length &&
                            !latestRecipesLoading &&
                            latestRecipes.map((item: IRecipe) => (
                                <React.Fragment key={item._id}>
                                    {RecipeCard(item)(setRecipeToShow)}
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </div>
            {/* latest recipes end */}

            {/* highest view recipes */}
            <div>
                <div className="flex items-center gap-5">
                    <div className="text-h1">Popular by Views</div>
                    <div>{`>>`}</div>
                    <div>See more</div>
                </div>
                <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap">
                    <div className="flex flex-row items-center gap-5 p-4">
                        {highestViewRecipesLoading && <div>Loading.....</div>}
                        {!!highestViewRecipes.length &&
                            !latestRecipesLoading &&
                            highestViewRecipes.map((item: IRecipe) => (
                                <React.Fragment key={item._id}>
                                    {RecipeCard(item)(setRecipeToShow)}
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </div>
            {/* highest view recipes end */}
        </div>
    );
}
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

function findInRecipeArrayAndAddOneView (recipes : IRecipe[], _id : IRecipe['_id']) {
    const newRecipes = recipes.map((item : IRecipe) => {
        if(item._id === _id) return {...item, views : item.views + 1};
        else return item;
    });
    return newRecipes;
}