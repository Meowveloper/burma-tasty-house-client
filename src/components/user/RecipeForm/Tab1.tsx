import React, { useEffect, useRef, useState } from "react";
import IRecipe from "../../../types/IRecipe";
import RecipeValidator from "../../../utilities/RecipeValidator";
interface IProps {
    recipe : IRecipe;
    setRecipe : React.Dispatch<React.SetStateAction<IRecipe>>;
    pageStart : boolean;
    setPageStart : React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Tab1(props : IProps) {
    const hiddenImageInput = useRef<HTMLInputElement>(null);
    const [ imagePreviewUrl, setImagePreviewUrl ] = useState<string | null>(null);

    useEffect(() => {
        if(props.recipe.image && props.recipe.image instanceof File) {
            setImagePreviewUrl(URL.createObjectURL(props.recipe.image));
        } else if (props.recipe.image && typeof props.recipe.image === 'string') {
            setImagePreviewUrl(props.recipe.image);
        }
    }, [props.recipe.image]);
    
    return (
        <div className="px-4">
            <div className="text-h2 mt-3 font-bold text-center">General Information</div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Title</div>
                <input value={props.recipe.title || ''} onChange={ handleTitleChange } type="text" className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none" />
                { (!props.pageStart && !RecipeValidator.title(props.recipe.title)) && (
                    <span className="text-red-500 font-bold">title must be at least 3 characters must contain at least one alphabetic character!</span>
                )}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Image</div>
                <div
                    onClick={() => {
                        hiddenImageInput.current?.click();
                    }}
                    className="dark:bg-dark-card text-center border dark:border-dark-border rounded-small w-full px-3 py-2 outline-none"
                >
                    Browse File
                </div>
                <input onChange={handleImageChange} type="file" accept="image/*" ref={hiddenImageInput} className="hidden" />
                {
                    (!props.pageStart && !RecipeValidator.image(props.recipe.image)) && (
                        <span className="text-red-500 font-bold">Image is required. Only jpg, jpeg, png and svg extension files are allowed and must not be larger than 50mb!!</span>
                    )
                }
                { !!imagePreviewUrl && (
                    <div className="w-full h-[300px] mt-3 rounded-small overflow-hidden">
                        <img className="w-full h-full" src={imagePreviewUrl} alt="" />
                    </div>
                )}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Description</div>
                <textarea onInput={ handleDescriptionChange } value={props.recipe.description || ''} className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none h-[200px]"></textarea>
                <div>{props.recipe.description?.length || 0}/1000</div>
                { (!props.pageStart && !RecipeValidator.description(props.recipe.description)) && (
                    <span className="text-red-500 font-bold">Only 1000 character count is allowed and must contain at least one alphabetic character!!</span>
                )}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Preparation Time in Minutes</div>
                <input onChange={ handlePreparationTimeChange } value={props.recipe.preparation_time || ''} type="number" className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none" />
                {(!props.pageStart && !RecipeValidator.preparation_time(props.recipe.preparation_time)) && (
                    <span className="text-red-500 font-bold">Preparation time must be at least 3 minutes!!</span>
                )}
            </div>
            <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div>
            <div className="mt-3">
                <div className="px-1 font-bold text-h3">Difficulty Level</div>
                <select onChange={ handleDifficultyLevelChange } value={props.recipe.difficulty_level || '1'} className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none">
                    <option value="1">1/10</option>
                    <option value="2">2/10</option>
                    <option value="3">3/10</option>
                    <option value="4">4/10</option>
                    <option value="5">5/10</option>
                    <option value="6">6/10</option>
                    <option value="7">7/10</option>
                    <option value="8">8/10</option>
                    <option value="9">9/10</option>
                    <option value="10">10/10</option>
                </select>
                {(!props.pageStart && !RecipeValidator.difficulty_level(props.recipe.difficulty_level)) && (
                    <span className="text-red-500 font-bold">Something went wrong!!</span>
                )}
            </div>
            <div className="bg-transparent my-4 w-[95%] mx-auto h-[1px]"></div>
        </div>
    );

    function handleTitleChange(e : React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);
        props.setRecipe((prev : IRecipe) => ({...prev, title : e.target.value}));
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);
        const file = e.target.files?.[0];
        if (file) {
            // if(!RecipeValidator.image(file)) return;
            console.log('here',RecipeValidator.image(file))
            setImagePreviewUrl(URL.createObjectURL(file));
            props.setRecipe((prev : IRecipe) => ({...prev, image : file ? file : null}));
        }
    }

    function handleDescriptionChange(e : React.ChangeEvent<HTMLTextAreaElement>) {
        props.setPageStart(false);
        props.setRecipe((prev : IRecipe) => ({...prev, description : e.target.value}));
    }

    function handlePreparationTimeChange(e : React.ChangeEvent<HTMLInputElement>) {
        props.setPageStart(false);
        props.setRecipe((prev : IRecipe) => ({
            ...prev, preparation_time : Number(e.target.value)
        }));
    }

    function handleDifficultyLevelChange(e : React.ChangeEvent<HTMLSelectElement>) {
        props.setRecipe((prev : IRecipe) => ({
            ...prev, difficulty_level : Number(e.target.value)
        }));
    }
}
