import axios from "./axios";
import IRecipe from "../types/IRecipe";
import IUser from "../types/IUser";
import { AuthContextType } from "../contexts/AuthContext";
import EnumAuthReducerActionTypes from "../types/EnumAuthReducerActionTypes";
export async function deleteRecipeInBackend(id: string): Promise<void> {
    try {
        const isConfirm = window.confirm("Are you sure you want to delete this recipe?");
        if (isConfirm) {
            const result = await axios.delete(`/recipes/${id}`);
            if (result.status !== 200) {
                throw new Error("error deleting recipe");
            }
        }
    } catch (e) {
        console.log(e);
    }
}
export function getAllRecipesExceptOne(recipeId: IRecipe["_id"], recipes: IRecipe[]) {
    return recipes.filter(item => item._id !== recipeId);
}

export function deleteRecipeInBackendAndRemoveRecipeFromStates(recipeId: IRecipe["_id"] | undefined | null, setStateFunctions: Array<React.Dispatch<React.SetStateAction<IRecipe[]>>>, callbackFunction: () => void): () => Promise<void> {
    return async function (): Promise<void> {
        try {
            // delete recipe in backend
            if (recipeId) {
                await deleteRecipeInBackend(recipeId);
                await Promise.all(setStateFunctions.map(setStateFunction => setStateFunction(prev => getAllRecipesExceptOne(recipeId, prev))));
            } else throw new Error("recipe id not found");
        } catch (e) {
            console.log(e);
            window.alert((e as Error).message);
        } finally {
            callbackFunction();
        }
    };
}
export function getAvatarUrl(avatar: IUser["avatar"]): string {
    if (!avatar) return "/image-placeholder.jpg";
    if (typeof avatar === "string") return avatar;
    return URL.createObjectURL(avatar);
}

export async function logout(authContext: AuthContextType) {
    try {
        const response = await axios.post("/users/logout");
        console.log(response);
        authContext.dispatch({ type: EnumAuthReducerActionTypes.Logout });
        history.pushState(null, "", "/");
    } catch (error) {
        console.log(error);
    }
}
