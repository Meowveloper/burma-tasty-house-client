import React, { useEffect, useRef, useState } from "react";
import IRecipe from "../../../types/IRecipe";
import RecipeValidator from "../../../utilities/RecipeValidator";
import updateObjectFields from "../../../utilities/updateRecipeField";
import getFileUrl from "../../../utilities/getFileUrl";

interface IProps {
    recipe: IRecipe;
    setRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
    pageStart: boolean;
    setPageStart: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Tab1(props: IProps) {
    const hiddenImageInput = useRef<HTMLInputElement>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(() => getFileUrl(props.recipe.image));

    useEffect(() => {
        console.log('checking infinite loop from components/user/RecipeForm/Tab1.tsx');
        const previewUrl = getFileUrl(props.recipe.image); // added to avoid adding imagePreviewUrl to dependency array
        setImagePreviewUrl(previewUrl);
        return function () {
            if(props.recipe.image instanceof File) {
                URL.revokeObjectURL(previewUrl || "");
            }
        }
    }, [props.recipe.image]);

    return (
        <div className="px-4">
            <div className="text-h2 mt-3 font-bold text-center">General Information</div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Title</div>
                <input value={props.recipe.title || ""} onChange={handleTitleChange} type="text" className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none" />
                {!props.pageStart && !RecipeValidator.title(props.recipe.title) && <span className="text-red-500 font-bold">title must be at least 3 characters must contain at least one alphabetic character!</span>}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Image</div>
                <div
                    onClick={() => {
                        hiddenImageInput.current?.focus();
                        hiddenImageInput.current?.click();
                    }}
                    className="dark:bg-dark-card text-center border dark:border-dark-border rounded-small w-full px-3 py-2 outline-none"
                >
                    Browse File
                </div>
                <input onChange={handleImageChange} type="file" accept="image/*" ref={hiddenImageInput} className="hidden" />
                {!props.pageStart && !RecipeValidator.image(props.recipe.image) && <span className="text-red-500 font-bold">Image is required. Only jpg, jpeg, png and svg extension files are allowed and must not be larger than 50mb!!</span>}
                {!!imagePreviewUrl && (
                    <div className="w-full h-[300px] mt-3 rounded-small overflow-hidden">
                        <img className="w-full h-full" src={imagePreviewUrl} alt="" />
                    </div>
                )}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Description</div>
                <textarea onInput={handleDescriptionChange} value={props.recipe.description || ""} className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none h-[200px]"></textarea>
                <div>{props.recipe.description?.length || 0}/1000</div>
                {!props.pageStart && !RecipeValidator.description(props.recipe.description) && <span className="text-red-500 font-bold">Only 1000 character count is allowed and must contain at least one alphabetic character!!</span>}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Preparation Time in Minutes</div>
                <input onChange={handlePreparationTimeChange} value={props.recipe.preparation_time || ""} type="number" className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none" />
                {!props.pageStart && !RecipeValidator.preparation_time(props.recipe.preparation_time) && <span className="text-red-500 font-bold">Preparation time must be at least 3 minutes!!</span>}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Difficulty Level</div>
                <select onChange={handleDifficultyLevelChange} value={props.recipe.difficulty_level || "1"} className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none">
                    {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}/10</option>
                    ))}
                </select>
                {!props.pageStart && !RecipeValidator.difficulty_level(props.recipe.difficulty_level) && <span className="text-red-500 font-bold">Something went wrong!!</span>}
            </div>
            <div className="bg-transparent my-4 w-[95%] mx-auto h-[1px]"></div>
        </div>
    );


    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);
        props.setRecipe(updateObjectFields(props.recipe, "title", e.target.value));
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);

        const fileList = e.target.files;

        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            if (file && RecipeValidator.image(file)) {
                props.setRecipe(updateObjectFields(props.recipe, "image", file))
            }
        } else {
            alert("No file selected or file could not be read.");
        }
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        props.setPageStart(false);
        props.setRecipe(updateObjectFields(props.recipe, "description", e.target.value));
    }

    function handlePreparationTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);
        props.setRecipe( updateObjectFields( props.recipe, "preparation_time", Number(e.target.value) ) );
    }

    function handleDifficultyLevelChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.setRecipe( updateObjectFields( props.recipe, "difficulty_level", Number(e.target.value) ) );
    }

}
