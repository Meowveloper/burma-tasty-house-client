import IRecipe from "../../../types/IRecipe";


export default function RecipeCard(recipe : IRecipe) {
    return function (setRecipeToShow: React.Dispatch<React.SetStateAction<IRecipe | null>>) {
        return (
            <div
                className="dark:bg-dark-card p-4 rounded-small"
                onClick={() => {
                    setRecipeToShow(recipe);
                }}
            >
                <div className="text-h3 font-bold dark:text-dark-text-highlight">{recipe.title}</div>
                <img src={recipe.image as string} className="w-full h-[150px] rounded-small" />
                <div>duration - {recipe.preparation_time}</div>
                <div>difficulty level - {recipe.difficulty_level}</div>
            </div>
        );
    };
}
