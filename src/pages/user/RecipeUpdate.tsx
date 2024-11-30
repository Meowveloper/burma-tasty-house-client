import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "../../utilities/axios";
import IRecipe from "../../types/IRecipe";
import RecipeForm from "../../components/user/RecipeForm/Index";
import EnumRecipeFormActions from "../../types/EnumRecipeFormActions";
import UserRecipeFormPreview from "../../components/user/RecipeForm/Preview";
import { AuthContext } from "../../contexts/AuthContext";
import { StepsToDeleteContext } from "../../contexts/StepsToDeleteContext";
import appendRecipeToFormData from "../../utilities/appendRecipeToFormData";
import { EnumUserRoutes } from "../../types/EnumRoutes";
import updateObjectFields from "../../utilities/updateObjectFields";
import ITag from "../../types/ITag";
import { TagsToDeleteContext } from "../../contexts/TagsToDeleteContext";
import RecipeValidator from "../../utilities/RecipeValidator";
export default function RecipeUpdate() {
    const params = useParams();
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [recipe, setRecipe] = useState<IRecipe>({} as IRecipe);
    const [ showPreview, setShowPreview ] = useState<boolean>(false);
    const [ pageStart , setPageStart ] = useState<boolean>(true);
    const [ formLoading, setFormLoading ] = useState<boolean>(false);
    const stepsToDeleteContext = useContext(StepsToDeleteContext);
    const tagsToDeleteContext = useContext(TagsToDeleteContext);
    const navigate = useNavigate();
    const updateRecipeTags = updateObjectFields(recipe)("tags");

    const authContext = useContext(AuthContext)
    console.log("parameters", params);
    useEffect(() => {
        console.log("checking infinite loop from pages/user/RecipeUpdate.tsx");
        setInitialLoading(true);
        axios
            .get(`/recipes/${params.id}`)
            .then(res => {
                setRecipe(res.data.data);
                console.log("recipe update", res.data.data);
            })
            .catch(e => {
                console.log(e);
                alert("error getting recipe");
                navigate(EnumUserRoutes.Home);
            })
            .finally(() => {
                setInitialLoading(false);
            });
    }, [params.id, navigate]);

    if (initialLoading || !recipe) return <div>Loading.....</div>;

    const PreviewWithRecipeAndSetShowPreviewAndSaveRecipeAndFormLoading = UserRecipeFormPreview(recipe)()(setShowPreview)(updateRecipe)(formLoading)(authContext.user);

    if(showPreview) return (
        PreviewWithRecipeAndSetShowPreviewAndSaveRecipeAndFormLoading
    );
    return (
        <div>
            <div className="text-h1 mb-3">
                Update the Recipe <span className="font-bold">{recipe?.title}</span>
            </div>

            <RecipeForm recipe={recipe} pageStart={pageStart} action={EnumRecipeFormActions.Update} setRecipe={setRecipe} setShowPreview={setShowPreview} formSubmit={updateRecipe} formLoading={formLoading} setPageStart={setPageStart}/>
        </div>
    );


    async function updateRecipe() 
    {
        if(!RecipeValidator.all(recipe, EnumRecipeFormActions.Update)) return;
        setFormLoading(true);
        console.log('steps to delete in update recipe function', stepsToDeleteContext.stepsToDelete);
        console.log('tags to delete in update recipe function', tagsToDeleteContext.tagsToDelete);
        try {
            // check authentication
            if(!authContext.user) throw new Error('not authenticated'); 

            // remove steps and tags if necessary
            const stepDeleteFormData = new FormData();
            stepsToDeleteContext.stepsToDelete.forEach(step => stepDeleteFormData.append('data', String(step)));

            const tagDeleteFormData = new FormData();
            tagsToDeleteContext.tagsToDelete.forEach(tag => tagDeleteFormData.append('data', String(tag)));
            tagDeleteFormData.append('recipeId', String(recipe._id));

            const [ stepsDeleteResult, tagsDeleteResult ] = await Promise.all([
                axios.post(`/steps/delete-multiple`, stepDeleteFormData),
                axios.put(`/tags/remove-recipe-from-multiple`, tagDeleteFormData)
            ]);

            if (stepsDeleteResult.status !== 200 || tagsDeleteResult.status !== 200) {
               throw new Error('error deleting steps and tags'); 
            } else {
                console.log('steps and tags deleted');
            }

            // update recipe
            const tags  = recipe.tags.map((tag) => {
                if (typeof tag === "string") return { name : tag } as ITag;
                else return tag;
            });

            const recipeFormData = appendRecipeToFormData(updateRecipeTags(tags), authContext.user._id);
            const result = await axios.put('/recipes', recipeFormData);
            
            if(result.status === 200) 
            {
                navigate(EnumUserRoutes.Home);
            }
        } catch (error) {
            console.log(error)            
        } finally {
            setFormLoading(false);
        } 

    }
}
