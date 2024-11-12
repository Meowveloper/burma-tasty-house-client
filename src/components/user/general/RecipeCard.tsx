import IRecipe from "../../../types/IRecipe";

interface IProps {
    recipe: IRecipe;
}

export default function RecipeCard(props: IProps) {
    return (
        <div className="dark:bg-dark-card p-4 rounded-small">
            <div className="text-h3 font-bold dark:text-dark-text-highlight">{ props.recipe.title }</div>
            <img src={props.recipe.image as string} className="w-full h-[150px] rounded-small" />
            <div>duration - {props.recipe.preparation_time}</div>
            <div>difficulty level - {props.recipe.difficulty_level}</div>
        </div>
    );
}
