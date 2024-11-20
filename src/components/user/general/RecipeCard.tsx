import IRecipe from "../../../types/IRecipe";
import IUser from "../../../types/IUser";
import addOneViewToRecipe from "../../../utilities/addOneViewToRecipe";


export default function RecipeCard(recipe : IRecipe, authContext : { user : IUser | null }) {
    return function (setRecipeToShow: React.Dispatch<React.SetStateAction<IRecipe | null>>) {
        return (
            <div
                className="dark:bg-dark-card p-4 rounded-small"
                onClick={() => { seeDetails(); }}
            >
                <div className="text-h3 font-bold dark:text-dark-text-highlight">{recipe.title}</div>
                <img src={recipe.image as string} className="w-full h-[150px] rounded-small" />
                <div>duration - {recipe.preparation_time}</div>
                <div>difficulty level - {recipe.difficulty_level}</div>
            </div>
        );

        function seeDetails () {
            if(!authContext.user) setRecipeToShow(recipe); 
            if(typeof recipe.user === 'string') setRecipeToShow(recipe);
            if(typeof recipe.user !== 'string' && authContext.user?._id === recipe.user._id) setRecipeToShow(recipe);
            if(typeof recipe.user !== 'string' && authContext.user?._id !== recipe.user._id) {
                addOneViewToRecipe(recipe._id).then(res => {
                    console.log(res);
                    setRecipeToShow(recipe);
                }).catch(e => {
                    console.log(e);
                    setRecipeToShow(recipe);
                });
            }
        }
    };

}
