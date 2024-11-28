import IRecipe from "../../types/IRecipe";
import IUser from "../../types/IUser";
import Preview from "../../components/user/RecipeForm/Preview";
import { useLocation, useNavigate } from "react-router-dom";
import { EnumUserRoutes } from "../../types/EnumRoutes";
import axios from '../../utilities/axios';
interface IProps {
    recipeToShow: IRecipe;
    user: IUser | null;
    setRecipeToShow: React.Dispatch<React.SetStateAction<IRecipe | null>>;
}
export default function RecipeDetail(props: IProps) {
    const recipeUserId = typeof props.recipeToShow.user === 'string' ? props.recipeToShow.user : props.recipeToShow.user._id;
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location', location.pathname)
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

            {
                props.user && props.user._id === recipeUserId && (
                    <>
                        <button onClick={() => { navigate(`${EnumUserRoutes.RecipeUpdate}/${props.recipeToShow._id}`)}} className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small ms-3">
                            Edit
                        </button>
                        
                        <button onClick={deleteRecipe} className="dark:bg-dark-card px-4 py-2 cursor-pointer rounded-small ms-3">
                            Delete
                        </button>
                    </>
                )
            }
        </div>
    );

    async function deleteRecipe() {
        const isConfirm = window.confirm("Are you sure you want to delete this recipe?");
        if (isConfirm) {
            const result = await axios.delete(`/recipes/${props.recipeToShow._id}`);
            if (result.status === 200) {
                navigate(location.pathname);
            }
        }
    }
}
