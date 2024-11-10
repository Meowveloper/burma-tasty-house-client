import IRecipe from "../../../types/IRecipe";

interface IProps {
    ingredients: IRecipe["ingredients"];
    removeIngredients? : (id : number) => void;
}

export default function Ingredients(props: IProps) {
    return (
        <div className="flex flex-wrap gap-4">
            {
                props.ingredients.map((item, i) => (
                    <div key={i} className="dark:bg-dark-elevate flex items-center gap-3 py-1 px-3 rounded-small">
                        {item}
                        { props.removeIngredients && (
                            <div onClick={() => { props.removeIngredients!(i); }} className="dark:bg-dark-secondary-card w-[20px] h-[20px] text-center leading-[20px] text-small rounded-full">X</div>
                        )}
                    </div>
                ))
            }
        </div>
    );
}
