import EnumRecipeFormActions from "../types/EnumRecipeFormActions";
import IRecipe from "../types/IRecipe";
import GeneralValidators from "./GeneralValidators";


class RecipeValidator {
    public static title(title: IRecipe['title']): boolean
    {
        if(title && GeneralValidators.isText(title)) {
            return title.length > 2;
        } else {
            return false;
        }
    }

    public static image(image : IRecipe['image']) : boolean
    {
        if(!(image instanceof File)) return false;
        else {
            return GeneralValidators.isImageByExtension(image.name);
        }
    }

    public static description(description : IRecipe['description']) : boolean
    {
        if(description && GeneralValidators.isText(description)) return description.length <= 1000;
        else return false;
    }

    public static preparation_time(preparation_time : IRecipe['preparation_time']) : boolean
    {
        if(typeof preparation_time !== 'number') return false;
        else return preparation_time >= 3;
    }

    public static difficulty_level(difficulty_level : IRecipe['difficulty_level']) : boolean
    {
        if(typeof difficulty_level !== 'number') return false;
        else return (difficulty_level >= 1 && difficulty_level <= 10);
    }

    public static tags(tags : IRecipe['tags']) : boolean 
    {
        return tags.length > 0;
    }

    public static ingredients(ingredients : IRecipe['ingredients']) : boolean 
    {
        return ingredients.length >= 3;
    }

    public static steps(steps : IRecipe['steps']) : boolean
    {
        return steps.length >= 2;
    }

    public static video(video : IRecipe['video']) : boolean 
    {
        if(video) {
           if(video instanceof File) return GeneralValidators.isVideoByExtension(video.name); 
        }
        return true;
    }

    public static all(recipe : IRecipe, action : EnumRecipeFormActions = EnumRecipeFormActions.Store) : boolean
    {
        console.log(action);

        if(!recipe.title || !this.title(recipe.title)) return false;

        if(!recipe.image || !this.image(recipe.image)) return false;

        if(!recipe.description || !this.description(recipe.description)) return false;

        if(!recipe.preparation_time || !this.preparation_time(recipe.preparation_time)) return false;

        if(!recipe.difficulty_level || !this.difficulty_level(recipe.difficulty_level)) return false;

        if(!recipe.tags || !this.tags(recipe.tags)) return false;

        if(!recipe.ingredients || !this.ingredients(recipe.ingredients)) return false;

        if(!recipe.steps || !this.steps(recipe.steps)) return false;

        if(recipe.video && !this.video(recipe.video)) return false;

        return true;
    }
}

export default RecipeValidator;
