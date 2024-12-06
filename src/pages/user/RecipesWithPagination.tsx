import { useParams } from "react-router-dom";
import Pagination from "../../components/general/Pagination";
import React, { useEffect, useMemo, useState, useContext } from "react";
import getFetchRecipesWithPaginationFunction from "../../utilities/getFetchRecipesWithPaginationFunction";
import IRecipe from "../../types/IRecipe";
import IPagination from "../../types/IPagination";
import RecipeCard from "../../components/user/general/RecipeCard";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteRecipeInBackendAndRemoveRecipeFromStates } from "../../utilities/generalHelperFunctions";
import RecipeDetail from "./RecipeDetail";

interface IProps {
    sort: string;
    needAuth: boolean;
}
export default function RecipesWithPagination(props: IProps) {
    const routeParams = useParams();
    const page: number = Number(routeParams.page) || 1;
    const apiUrl: string = "/recipes/sort-with-pagination";
    const authContext = useContext(AuthContext);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<IPagination | null>(null);

    const fetchRecipes: (baseUrl: string) => Promise<void> = useMemo(() => getFetchRecipesFunction(page, props.sort, props.needAuth), [page, props.sort, props.needAuth]);

    const [recipeToShow, setRecipeToShow] = useState<IRecipe | null>(null);

    useEffect(() => {
        console.log("checking infinite loop from pages/user/LatestRecipes");
        fetchRecipes(apiUrl);
    }, [fetchRecipes]);

    const deleteRecipeAndRemoveFromRecipes = deleteRecipeInBackendAndRemoveRecipeFromStates(recipeToShow?._id, [setRecipes], () => setRecipeToShow(null));

    if (recipeToShow) return <RecipeDetail recipeToShow={recipeToShow} user={authContext.user} setRecipeToShow={setRecipeToShow} deleteRecipe={deleteRecipeAndRemoveFromRecipes}></RecipeDetail>;

    return (
        <div>
            <div className="text-h2 font-bold mb-2">{getTitle(props.sort, props.needAuth)}</div>
            {loading && <div>Loading...</div>}
            {!!pagination && !!pagination.totalPages && !loading && <Pagination page={page} totalPages={pagination.totalPages} total={pagination.total} totalShowed={recipes.length} />}
            <div className="grid grid-cols-2 desktop:grid-cols-4 tablet:grid-cols-3 gap-4 mt-5">
                {!!recipes.length && !loading && recipes.map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}
                {!loading && !recipes.length && <div className="font-bold">{getZeroRecipeText(props.needAuth)}</div>}
            </div>
        </div>
    );

    function getFetchRecipesFunction(page: number, sort: string, needAuth: boolean): (baseUrl: string) => Promise<void> {
        return async function (baseUrl: string): Promise<void> {
            const url = `${baseUrl}/${page}?sort=${sort}&needAuth=${needAuth ? 1 : 0}`;
            try {
                setLoading(true);
                const getRecipesWithPagination = getFetchRecipesWithPaginationFunction<IRecipe[]>(url);
                const { data, pagination } = await getRecipesWithPagination();
                console.log("recipes", data);
                console.log("pagination", pagination);
                setRecipes(data);
                setPagination(pagination);
            } catch (e) {
                console.log((e as Error).message);
            } finally {
                setLoading(false);
            }
        };
    }
}

// outside
function getTitle(sort: IProps["sort"], needAuth: IProps["needAuth"]): string {
    if (needAuth) return "Recipes of people you followed";
    if (sort === "createdAt") return "Latest Recipes";
    if (sort === "views") return "Highest Viewed Recipes";
    if (sort === "comments") return "Highest Commented Recipes";
    else return "recipes";
}

function getZeroRecipeText(needAuth: IProps["needAuth"]): string {
    if (needAuth) return "No recipes found of people you followed, may be you need to follow some users or login";
    else return "No recipes found";
}
