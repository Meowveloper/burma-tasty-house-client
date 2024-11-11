import IRecipe from "../../../types/IRecipe";
import UserGeneralTags from "../general/Tags";
import UserGeneralIngredients from "../general/Ingredients";
import { Icon } from "@iconify/react";
import IStep from "../../../types/IStep";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
interface IProps {
    recipe: IRecipe;
    notPreview?: boolean;
    setShowPreview?: React.Dispatch<React.SetStateAction<boolean>>;
    saveRecipe? : () => void;
    formLoading : boolean;
}

export default function Preview(props: IProps) {
    const authContext = useContext(AuthContext);
    return (
        <div>
            <div className="grid grid-cols-12 gap-2">
                {/* image, title and views */}
                <div className="flex flex-col gap-3 col-span-12 border-b dark:border-dark-border pb-2">

                    {/* image */}
                    <div className="w-full">
                        {!!(props.recipe?.image && typeof props.recipe.image === "string") && <img src={props.recipe.image} className="w-full h-[400px] rounded-small" alt="" />}

                        {!!(props.recipe?.image && props.recipe.image instanceof File) && <img src={URL.createObjectURL(props.recipe.image)} className="w-full h-[400px] rounded-small" alt="" />}

                        {!props.recipe?.image && (
                            <div className="w-full">
                                <div className="text-h3">Image</div>
                                <div className="dark:text-dark-card">No image added...</div>
                            </div>
                        )}

                        {/* check if the image is an empty object */}
                        {!!props.recipe.image && typeof props.recipe.image === "object" && !Array.isArray(props.recipe.image) && Object.keys(props.recipe.image).length === 0 && !(props.recipe.image instanceof File) && (
                            <div className="w-full">
                                <div className="text-h3">Image</div>
                                <div className="dark:text-dark-card">No image added...</div>
                            </div>
                        )}
                    </div>
                    {/* image end */}

                    <div className="flex justify-between items-center">
                        {!!props.recipe?.title && <div className="text-h1 font-bold">{ props.recipe.title }</div>}
                        {!props.recipe?.title && (
                            <div className="">
                                <div className="text-h3">Title</div>
                                <div className="dark:text-dark-card">Title is not added...</div>
                            </div>
                        )}

                        {!!props.notPreview && (
                            <div className="flex items-center gap-2">
                                <Icon icon="ph:eye-light" />
                                <div>30</div>
                            </div>
                        )}
                    </div>
                </div>
                {/* image, title and views end */}

                {/* preparation time, difficulty level and user */}
                <div className="col-span-12 border-b dark:border-dark-border pb-2">
                    <div className="flex items-center gap-2">
                        <div>Post owner - </div>
                        {(!!props.recipe?.user && typeof props.recipe?.user === 'string') && <div className="font-bold text-h3 cursor-pointer">{props.recipe.user}</div>}
                        {(!!props.recipe?.user && typeof props.recipe?.user === 'object') && <div className="font-bold text-h3 cursor-pointer">{props.recipe.user.name}</div>}
                        { (!props.recipe?.user && authContext.user) && <div className="font-bold text-h3 cursor-pointer">{ authContext.user.name }</div> }
                        {(!props.recipe?.user && !authContext.user) && <div className="dark:text-dark-card">No data...</div>}
                    </div>
                    <div className="flex items-center gap-2">
                        <div>Preparation Time - </div>
                        {!!props.recipe?.preparation_time && <div className="font-bold">{ props.recipe.preparation_time } minutes</div>}
                        {!props.recipe?.preparation_time && <div className="dark:text-dark-card">No data...</div>}
                    </div>
                    <div className="flex items-center gap-2">
                        <div>Difficulty Level - </div>
                        {!!props.recipe?.difficulty_level && <div className="font-bold">{props.recipe.difficulty_level}/10</div>}
                        {!props.recipe?.difficulty_level && <div className="dark:text-dark-card">No data...</div>}
                    </div>
                </div>
                {/* preparation time, difficulty level and user end */}

                {/* description */}
                {!!props.recipe?.description && <div className="col-span-12 border-b dark:border-dark-border pb-2">{ props.recipe.description }</div>}
                {!props.recipe?.description && <div className="dark:text-dark-card col-span-12 border-b dark:border-dark-border pb-2">No description added...</div>}
                {/* description end */}

                {/* tags */}
                <div className="col-span-12 border-b dark:border-dark-border pb-2">
                    <div className="text-h2">Tags</div>
                    {!!props.recipe?.tags?.length && (
                        <div className="mt-3">
                            <UserGeneralTags tags={props.recipe.tags}></UserGeneralTags>
                        </div>
                    )}
                    {!props.recipe?.tags?.length && <div className="dark:text-dark-card">No tags added.....</div>}
                </div>
                {/* tags end */}

                {/* ingredients */}
                <div className="col-span-12 border-b dark:border-dark-border pb-2">
                    <div className="text-h2">Ingredients</div>
                    {!!props.recipe?.ingredients?.length && (
                        <div className="mt-3">
                            <UserGeneralIngredients ingredients={props.recipe.ingredients}></UserGeneralIngredients>
                        </div>
                    )}
                    {!props.recipe?.ingredients?.length && <div className="dark:text-dark-card">No ingredients added.....</div>}
                </div>
                {/* ingredients end */}

                {/* steps */}
                <div className="col-span-12 border-b dark:border-dark-border pb-2">
                    <div className="text-h2">Steps</div>
                    {!!props.recipe?.steps?.length && (
                        <div className="grid grid-cols-1 gap-2">
                            {/* card */}
                            { props.recipe.steps.map((item : IStep) => (
                                <div className="dark:bg-dark-card p-2 rounded-small" key={item.sequence_number}>
                                    <div className="flex items-center gap-3">
                                        { !!item.image && (
                                            <img src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} className="w-45% h-[150px] rounded-small" alt="" />
                                        )}
                                        <div className="flex-1 flex items-center gap-2">
                                            <div className="text-h3 font-bold">step</div>
                                            <div className="text-logo font-bold">{item.sequence_number}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {item.description}
                                    </div>
                                </div>
                            ))}
                            {/* card end */}
                        </div>
                    )}
                    {!props.recipe?.steps?.length && <div className="dark:text-dark-card">No steps added...</div>}
                </div>
                {/* steps end */}

                {/* video */}
                <div className="col-span-12 border-b dark:border-dark-border pb-2">
                    <div className="text-h2 mb-2">Tutorial Video</div>
                    {!!props.recipe?.video && (
                        <video className="h-[200px] w-full" controls>
                            <source src={props.recipe.video instanceof File ? URL.createObjectURL(props.recipe.video) : props.recipe.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    {!props.recipe?.video && <div className="dark:text-dark-card">No video added..</div>}
                </div>
                {/* video end */}

                {/* buttons */}
                <div className="col-span-12 mt-3">
                    {!!props.setShowPreview && (
                        <button
                            onClick={() => {
                                props.setShowPreview!(false);
                            }}
                            className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small me-3"
                        >
                            Back to Form
                        </button>
                    )}
                    {(props.setShowPreview && props.saveRecipe) && (
                        <button onClick={props.saveRecipe} className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small me-3">
                            {props.formLoading && (<div className="recipe-form-loader m-auto"></div>)}
                            {!props.formLoading && <span>Save</span>}

                        </button>
                    )}
                </div>
                {/* buttons end */}
            </div>
        </div>
    );
}
