import IRecipe from "../../types/IRecipe";
import IUser from "../../types/IUser";
import Preview from "../../components/user/RecipeForm/Preview";
import { useLocation, useNavigate } from "react-router-dom";
import { EnumUserRoutes } from "../../types/EnumRoutes";
import CommentSection from "../../components/user/comment/CommentSection";
interface IProps {
    recipeToShow: IRecipe;
    user: IUser | null;
    setRecipeToShow: React.Dispatch<React.SetStateAction<IRecipe | null>>;
    deleteRecipe: () => Promise<void>;
}
export default function RecipeDetail(props: IProps) {
    const recipeUserId = typeof props.recipeToShow.user === "string" ? props.recipeToShow.user : props.recipeToShow.user._id;
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location", location.pathname);
    return (
        <div className="w-full">
            {Preview(props.recipeToShow)(true)()()()(props.user)}
            <button
                onClick={() => {
                    props.setRecipeToShow(null);
                }}
                className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small"
            >
                Back
            </button>
            {props.user && props.user._id === recipeUserId && (
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
            {/* comments */}
            <CommentSection recipeId={props.recipeToShow._id}></CommentSection>
            {/* comments end */}
        </div>
    );
}
