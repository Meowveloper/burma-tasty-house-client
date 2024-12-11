import IRecipe from "../../types/IRecipe";
import IUser from "../../types/IUser";
import Preview from "../../components/user/RecipeForm/Preview";
import { useLocation, useNavigate } from "react-router-dom";
import { EnumUserRoutes } from "../../types/EnumRoutes";
import CommentSection from "../../components/user/comment/CommentSection";
import axios from "../../utilities/axios";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import updateObjectFields from "../../utilities/updateObjectFields";
import EnumAuthReducerActionTypes from "../../types/EnumAuthReducerActionTypes";
import ReportPopUp from "../../components/user/general/ReportPopUp";
interface IProps {
    recipeToShow: IRecipe;
    setRecipeToShow: React.Dispatch<React.SetStateAction<IRecipe | null>>;
    deleteRecipe: () => Promise<void>;
}
export default function RecipeDetail(props: IProps) {
    const recipeUserId = typeof props.recipeToShow.user === "string" ? props.recipeToShow.user : props.recipeToShow.user._id;
    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useContext(AuthContext);
    console.log("location", location.pathname);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => {
                        props.setRecipeToShow(null);
                    }}
                    className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small mb-5"
                >
                    Back
                </button>
                <ReportPopUp recipeId={props.recipeToShow._id}>
                    <div className="text-dark-border font-bold cursor-pointer hover:text-dark-text">report this recipe</div>
                </ReportPopUp>
            </div>

            {Preview(props.recipeToShow)(true)()()()(authContext.user)}

            <button
                onClick={() => {
                    props.setRecipeToShow(null);
                }}
                className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small"
            >
                Back
            </button>
            {authContext.user && authContext.user._id === recipeUserId && (
                <>
                    <button
                        onClick={() => {
                            navigate(`${EnumUserRoutes.RecipeUpdate}/${props.recipeToShow._id}`);
                        }}
                        className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small ms-3"
                    >
                        Edit
                    </button>

                    <button onClick={props.deleteRecipe} className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small ms-3">
                        Delete
                    </button>
                </>
            )}

            {authContext.user &&
                authContext.user._id !== recipeUserId &&
                (checkIfAlreadySaved(props.recipeToShow._id, authContext.user.saves) ? (
                    <button onClick={() => unsave(props.recipeToShow._id, authContext)} className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small ms-3">
                        unsave
                    </button>
                ) : (
                    <button onClick={() => save(props.recipeToShow._id, authContext)} className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small ms-3">
                        save
                    </button>
                ))}
            {/* comments */}
            <CommentSection recipeId={props.recipeToShow._id}></CommentSection>
            {/* comments end */}
        </div>
    );
}

function checkIfAlreadySaved(recipeId: IRecipe["_id"], userSavedRecipes: IUser["saves"]): boolean {
    if (!userSavedRecipes) return false;
    const savedIds = userSavedRecipes.map(recipe => {
        if (recipe) {
            if (typeof recipe === "string") return recipe;
            return recipe._id;
        }
    });

    return savedIds.includes(recipeId);
}

async function save(id: IRecipe["_id"], authContext: AuthContextType) {
    try {
        if (!authContext.user) throw new Error("not authenticated");
        const updateUserSavedFields = updateObjectFields(authContext.user)("saves");
        const result = await axios.post("/users/add-saves", { recipe: id });
        if (result.status !== 200) throw new Error("error saving recipe");
        console.log(result);

        const user: IUser = updateUserSavedFields(authContext.user.saves ? [...authContext.user.saves, id] : [id]);
        authContext.dispatch({ type: EnumAuthReducerActionTypes.LoginOrRegister, payload: user });
    } catch (e) {
        console.log(e);
    }
}

async function unsave(id: IRecipe["_id"], authContext: AuthContextType) {
    try {
        if (!authContext.user) throw new Error("not authenticated");
        const updateUserSavedFields = updateObjectFields(authContext.user)("saves");
        const result = await axios.post("/users/remove-saves", { recipe: id });
        if (result.status !== 200) throw new Error("error saving recipe");
        console.log(result);
        const user: IUser = updateUserSavedFields(removeRecipeFromSaves(id, authContext.user.saves));
        authContext.dispatch({ type: EnumAuthReducerActionTypes.LoginOrRegister, payload: user });
    } catch (e) {
        console.log(e);
    }
}

function removeRecipeFromSaves(recipeId: IRecipe["_id"], saves: IUser["saves"]): IUser["saves"] {
    if (!saves) return [];
    return saves.filter(recipe => {
        if (typeof recipe === "string") return recipe !== recipeId;
        return recipe?._id !== recipeId;
    });
}
