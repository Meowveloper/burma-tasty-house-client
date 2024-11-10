import { useEffect, useRef, useState } from "react";
import IRecipe from "../../../types/IRecipe";
import RecipeValidator from "../../../utilities/RecipeValidator";

interface IProps {
    recipe : IRecipe;
    setRecipe : React.Dispatch<React.SetStateAction<IRecipe>>;
    pageStart : boolean;
    setPageStart : React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Tab5(props : IProps) {
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const hiddenVideoInput = useRef<HTMLInputElement>(null);
    useEffect(() => {
        console.log('Checking the infinite loop from components/user/RecipeForm/Tab5');
        if(props.recipe.video && props.recipe.video instanceof File) {
            setVideoPreviewUrl(URL.createObjectURL(props.recipe.video));
        }
    }, [props.recipe.video])
    return (
        <div>
            <div className="text-h2 mb-5 font-bold mt-3 text-center">
                tutorial <span className="dark:text-dark-text-highlight">VIDEO</span> of your recipe
            </div>
            <div className="mb-3">
                <div
                    onClick={() => {
                        hiddenVideoInput.current?.click();
                    }}
                    className="dark:bg-dark-card text-center border dark:border-dark-border rounded-small w-full px-3 py-2 outline-none"
                >
                    Browse File
                </div>
                <input onChange={handleVideoChange} type="file" accept="video/*" ref={hiddenVideoInput} className="hidden" />
            </div>
            { (!props.pageStart && !RecipeValidator.video(props.recipe.video)) && (
                <span className="text-red-500 font-bold">Video must be in mp4 format.</span>
            )}
            {!!videoPreviewUrl && (
                <video className="h-[400px] w-full mb-5" controls>
                    <source src={videoPreviewUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            
        </div>
    );

    function handleVideoChange(e : React.ChangeEvent<HTMLInputElement>) {

        props.setPageStart(false);
        const file = e.target.files?.[0];
        if(file) {
            console.log(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
            props.setRecipe((prev : IRecipe) => ({ ...prev, video : file }));
        }

    }

}
