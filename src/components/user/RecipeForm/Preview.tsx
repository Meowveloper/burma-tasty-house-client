import IRecipe from "../../../types/IRecipe";
import UserGeneralTags from "../general/Tags";
import UserGeneralIngredients from "../general/Ingredients";
import { Icon } from "@iconify/react";
import IStep from "../../../types/IStep";
import IUser from "../../../types/IUser";
import { Link } from "react-router-dom";
import { EnumUserRoutes } from "../../../types/EnumRoutes";
// interface IProps {
//     recipe: IRecipe;
//     notPreview?: boolean;
//     setShowPreview?: React.Dispatch<React.SetStateAction<boolean>>;
//     saveRecipe? : () => void;
//     formLoading? : boolean;
// }
type SaveRecipe = () => void;

export default function Preview(recipe: IRecipe) {
    return function (notPreview: boolean = false) {
        return function (setShowPreview: React.Dispatch<React.SetStateAction<boolean>> | undefined = undefined) {
            return function (saveRecipe: SaveRecipe | undefined = undefined) {
                return function (formLoading: boolean | undefined = undefined) {
                    return function (user: IUser | null = null) : JSX.Element {
                        return (
                            <div className="w-full flex items-start gap-10">
                                <div className="w-full desktop:w-[50%] grid grid-cols-12 gap-2">
                                    {/* image, title and views */}
                                    <div className="flex flex-col gap-3 col-span-12 border-b dark:border-dark-border pb-2">
                                        {/* image */}
                                        <div className="w-full">
                                            {!!(recipe?.image && typeof recipe.image === "string") && <img src={recipe.image} className="w-full h-[400px] rounded-small" alt="" />}

                                            {!!(recipe?.image && recipe.image instanceof File) && <img src={URL.createObjectURL(recipe.image)} className="w-full h-[400px] rounded-small" alt="" />}

                                            {!recipe?.image && (
                                                <div className="w-full">
                                                    <div className="text-h3">Image</div>
                                                    <div className="dark:text-dark-card">No image added...</div>
                                                </div>
                                            )}

                                            {/* check if the image is an empty object */}
                                            {!!recipe.image && typeof recipe.image === "object" && !Array.isArray(recipe.image) && Object.keys(recipe.image).length === 0 && !(recipe.image instanceof File) && (
                                                <div className="w-full">
                                                    <div className="text-h3">Image</div>
                                                    <div className="dark:text-dark-card">No image added...</div>
                                                </div>
                                            )}
                                        </div>
                                        {/* image end */}

                                        <div className="flex justify-between items-center">
                                            {!!recipe?.title && <div className="text-h1 font-bold">{recipe.title}</div>}
                                            {!recipe?.title && (
                                                <div className="">
                                                    <div className="text-h3">Title</div>
                                                    <div className="dark:text-dark-card">Title is not added...</div>
                                                </div>
                                            )}

                                            {!!notPreview && (
                                                <div className="flex items-center gap-2">
                                                    <Icon icon="ph:eye-light" />
                                                    <div>{recipe?.views ? recipe.views : 0}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* image, title and views end */}

                                    {/* preparation time, difficulty level and user */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2">
                                        <div className="flex items-center gap-2">
                                            <div>Post owner - </div>
                                            {!!recipe?.user && typeof recipe?.user === "string" && <Link to={`${EnumUserRoutes.Profile}/${recipe.user}`} className="font-bold text-h3 cursor-pointer">{recipe.user}</Link>}
                                            {!!recipe?.user && typeof recipe?.user === "object" && <Link to={`${EnumUserRoutes.Profile}/${recipe.user._id}`} className="font-bold text-h3 cursor-pointer">{recipe.user.name} { recipe.user._id === user?._id && <span> (YOU)</span>}</Link> }
                                            {!recipe?.user && !user && <div className="dark:text-dark-card">No data...</div>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>Preparation Time - </div>
                                            {!!recipe?.preparation_time && <div className="font-bold">{recipe.preparation_time} minutes</div>}
                                            {!recipe?.preparation_time && <div className="dark:text-dark-card">No data...</div>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>Difficulty Level - </div>
                                            {!!recipe?.difficulty_level && <div className="font-bold">{recipe.difficulty_level}/10</div>}
                                            {!recipe?.difficulty_level && <div className="dark:text-dark-card">No data...</div>}
                                        </div>
                                    </div>
                                    {/* preparation time, difficulty level and user end */}

                                    {/* description */}
                                    {!!recipe?.description && <div className="col-span-12 border-b dark:border-dark-border pb-2">{recipe.description}</div>}
                                    {!recipe?.description && <div className="dark:text-dark-card col-span-12 border-b dark:border-dark-border pb-2">No description added...</div>}
                                    {/* description end */}

                                    {/* tags */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2">
                                        <div className="text-h2">Tags</div>
                                        {!!recipe?.tags?.length && (
                                            <div className="mt-3">
                                                <UserGeneralTags tags={recipe.tags}></UserGeneralTags>
                                            </div>
                                        )}
                                        {!recipe?.tags?.length && <div className="dark:text-dark-card">No tags added.....</div>}
                                    </div>
                                    {/* tags end */}

                                    {/* ingredients */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2">
                                        <div className="text-h2">Ingredients</div>
                                        {!!recipe?.ingredients?.length && (
                                            <div className="mt-3">
                                                <UserGeneralIngredients ingredients={recipe.ingredients}></UserGeneralIngredients>
                                            </div>
                                        )}
                                        {!recipe?.ingredients?.length && <div className="dark:text-dark-card">No ingredients added.....</div>}
                                    </div>
                                    {/* ingredients end */}

                                    {/* steps */} {/* only for mobile and tablet */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2 desktop:hidden">
                                        <div className="text-h2">Steps</div>
                                        {!!recipe?.steps?.length && (
                                            <div className="grid grid-cols-1 gap-2">
                                                {/* card */}
                                                {recipe.steps.map((item: IStep) => (
                                                    <div className="dark:bg-dark-card p-2 rounded-small" key={item.sequence_number}>
                                                        <div className="flex items-center gap-3">
                                                            {!!item.image && <img src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} className="w-45% h-[150px] rounded-small" alt="" />}
                                                            <div className="flex-1 flex items-center gap-2">
                                                                <div className="text-h3 font-bold">step</div>
                                                                <div className="text-logo font-bold">{item.sequence_number}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3">{item.description}</div>
                                                    </div>
                                                ))}
                                                {/* card end */}
                                            </div>
                                        )}
                                        {!recipe?.steps?.length && <div className="dark:text-dark-card">No steps added...</div>}
                                    </div>
                                    {/* steps end */} {/* only for mobile and tablet */}

                                    {/* video */} {/* only for mobile and tablet */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2 desktop:hidden">
                                        <div className="text-h2 mb-2">Tutorial Video</div>
                                        {!!recipe?.video && (
                                            <video className="h-[200px] w-full" controls>
                                                <source src={recipe.video instanceof File ? URL.createObjectURL(recipe.video) : recipe.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {!recipe?.video && <div className="dark:text-dark-card">No video added..</div>}
                                    </div>
                                    {/* video end */} {/* only for mobile and tablet */}

                                    {/* buttons */}
                                    <div className="col-span-12 mt-3 text-center">
                                        {!!setShowPreview && (
                                            <button
                                                onClick={() => {
                                                    setShowPreview!(false);
                                                }}
                                                className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small me-3"
                                            >
                                                Back to Form
                                            </button>
                                        )}
                                        {setShowPreview && saveRecipe && (
                                            <button onClick={saveRecipe} className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small">
                                                {formLoading && <div className="recipe-form-loader m-auto"></div>}
                                                {!formLoading && <span>Save</span>}
                                            </button>
                                        )}
                                    </div>
                                    {/* buttons end */}
                                </div>

                                {/* only for desktop */}
                                <div className="hidden desktop:grid w-full desktop:w-[50%] grid-cols-12 gap-2">
                                    {/* steps */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2">
                                        <div className="text-h2">Steps</div>
                                        {!!recipe?.steps?.length && (
                                            <div className="grid grid-cols-1 gap-2">
                                                {/* card */}
                                                {recipe.steps.map((item: IStep) => (
                                                    <div className="dark:bg-dark-card p-2 rounded-small" key={item.sequence_number}>
                                                        <div className="flex items-center gap-3">
                                                            {!!item.image && <img src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image} className="w-45% h-[150px] rounded-small" alt="" />}
                                                            <div className="flex-1 flex items-center gap-2">
                                                                <div className="text-h3 font-bold">step</div>
                                                                <div className="text-logo font-bold">{item.sequence_number}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3">{item.description}</div>
                                                    </div>
                                                ))}
                                                {/* card end */}
                                            </div>
                                        )}
                                        {!recipe?.steps?.length && <div className="dark:text-dark-card">No steps added...</div>}
                                    </div>
                                    {/* steps end */}

                                    {/* video */}
                                    <div className="col-span-12 border-b dark:border-dark-border pb-2">
                                        <div className="text-h2 mb-2">Tutorial Video</div>
                                        {!!recipe?.video && (
                                            <video className="h-[200px] w-full" controls>
                                                <source src={recipe.video instanceof File ? URL.createObjectURL(recipe.video) : recipe.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {!recipe?.video && <div className="dark:text-dark-card">No video added..</div>}
                                    </div>
                                    {/* video end */}
                                </div>
                                {/* only for desktop */}
                            </div>
                        );
                    };
                };
            };
        };
    };
}
