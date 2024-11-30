import IRecipe from "../types/IRecipe";
import IStep from "../types/IStep";
import ITag from "../types/ITag";
import IUser from "../types/IUser";
function appendRecipeToFormData (recipe : IRecipe, userId : IUser['_id']) : FormData {
        //form data
        const formData = new FormData();
        if(recipe._id) formData.append("_id", recipe._id);
        formData.append("title", recipe.title);
        if (recipe.image && recipe.image instanceof File) formData.append("image", recipe.image);
        if (recipe.video && recipe.video instanceof File) formData.append("video", recipe.video);
        formData.append("description", recipe.description);
        formData.append("preparation_time", String(recipe.preparation_time));
        formData.append("difficulty_level", String(recipe.difficulty_level));
        recipe.ingredients.forEach((item) => {
            formData.append('ingredients', item);
        });
        formData.append("user", userId);
        if (recipe.steps) {
            const steps: IStep[] = recipe.steps.map(item => ({
                ...item,
                image: item.image instanceof File ? null : item.image,
            }));
            steps.forEach(item => {
                formData.append('steps', JSON.stringify(item));
            });
            recipe.steps?.forEach((step) => {
                if (step.image instanceof File) {
                    formData.append(`step_image_${step.sequence_number}`, step.image); // Append step image file
                }
            });
        }
        if(recipe.tags) {
            recipe.tags.forEach((item : string | ITag) => {
                if(typeof item === 'string') formData.append('tags', item);
                else formData.append('tags', JSON.stringify(item)); 
            })
        }
        return formData;
        //form data end
}

export default appendRecipeToFormData;