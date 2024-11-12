import { useState, useEffect, useContext } from "react";
import UserRecipeForm from "../../components/user/RecipeForm/Index";
import EnumRecipeFormActions from "../../types/EnumRecipeFormActions";
import UserRecipeFormPreview from "../../components/user/RecipeForm/Preview";
import IRecipe from "../../types/IRecipe";
import axios from "../../utilities/axios";
import storeObjectInIndexedDB from "../../utilities/storeObjectInIndexDB";
import getRecipeFromIndexedDB from "../../utilities/getObjectFromIndexDB";
import appendRecipeToFormData from "../../utilities/appendRecipeToFormData";
import RecipeValidator from "../../utilities/RecipeValidator";
import { AuthContext } from "../../contexts/AuthContext";
import deleteObjectInIndexedDB from "../../utilities/deleteObjectInIndexedDB";
import { useNavigate } from "react-router-dom";

export default function UserRecipeCreate() {
    const authContext = useContext(AuthContext);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const [recipe, setRecipe] = useState<IRecipe>({} as IRecipe);
    const [ formLoading, setFormLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    // Function to fetch recipe from IndexedDB
    const fetchRecipeFromIndexedDB = () => {
        getRecipeFromIndexedDB(data => {
            if (data) {
                setRecipe(data); // Set the retrieved recipe to state
            } else {
                console.log("recipe not found");
            }
        });
    };

    // Use useEffect to fetch the recipe when the component mounts
    useEffect(() => {
        fetchRecipeFromIndexedDB();
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        console.log("checking useEffect in pages/user/RecipeCreate.tsx");
        storeObjectInIndexedDB(recipe);
    }, [recipe]); // this useEffect is for updating the recipe in the indexDB every time the recipe changes

    return (
        <>
            {!showPreview && (
                <div>
                    <div className="dark:text-dark-text-highlight text-h1">Create Your Own Recipe</div>
                    <UserRecipeForm saveRecipe={saveRecipe} recipe={recipe} setRecipe={setRecipe} action={EnumRecipeFormActions.Store} setShowPreview={setShowPreview} formLoading={formLoading}></UserRecipeForm>
                </div>
            )}

            {showPreview && <UserRecipeFormPreview setShowPreview={setShowPreview} recipe={recipe} saveRecipe={saveRecipe} formLoading={formLoading}></UserRecipeFormPreview>}
        </>
    );

    function saveRecipe()
    {
        setFormLoading(true);
        console.log(RecipeValidator.all(recipe, EnumRecipeFormActions.Store));
        let formData : FormData;
        if(!RecipeValidator.all(recipe, EnumRecipeFormActions.Store)) return;
        if(authContext.user) {
            formData  = appendRecipeToFormData(recipe, authContext.user._id);
        } else {
            return;
        }
        axios
            .post("/recipes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(async res => {
                console.log(res);
                await deleteObjectInIndexedDB('recipe');
            }).catch(e => {
                console.error(e);
            }).finally(() => {
                setFormLoading(false);
                navigate('/');               
            });
    }
}
