import IRecipe from "../../../types/IRecipe";

interface IProps {
    tags : IRecipe['tags'];
    removeTag? : (id : string | number) => void;
}
export default function Tags(props : IProps) {
    return (
        <div className="flex flex-wrap gap-4">
            {
                props.tags.map((item, i) => (
                    <div key={typeof item === 'string' ? i : item._id} className="dark:bg-dark-elevate flex items-center gap-3 py-1 px-3 rounded-small">
                        {typeof item === 'string' ? item : item.name}

                        { !!props.removeTag && (
                                <div onClick={() => { props.removeTag!(typeof item === 'string' ? i : item._id); }} className="dark:bg-dark-secondary-card w-[20px] h-[20px] text-center leading-[20px] text-small rounded-full cursor-pointer">X</div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
}
