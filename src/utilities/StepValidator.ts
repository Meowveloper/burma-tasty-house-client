import IStep from "../types/IStep";
import GeneralValidators from "./GeneralValidators";

class StepValidator 
{
    public static sequence_number (newNumber : IStep['sequence_number'], oldSteps : IStep[]) : boolean 
    {
        return (!oldSteps.find((item) => item.sequence_number === newNumber)) && newNumber > 0;
    }

    public static description (description : IStep['description']) : boolean
    {
        return GeneralValidators.isText(description) && description.length > 5;
    }

    public static image(image : IStep['image']) : boolean
    {
        if(image && image instanceof File) return GeneralValidators.isImageByExtension(image.name);
        return true;
    }

    public static all (newStep : IStep, oldSteps : IStep[]) : boolean
    {
        if(!newStep.sequence_number || !newStep.description || newStep.description === '') return false;
        if(newStep.sequence_number && !this.sequence_number(newStep.sequence_number, oldSteps)) return false
        if(newStep.description && !this.description(newStep.description)) return false;
        if(newStep.image && !this.image(newStep.image)) return false;

        return true;
    }
}

export default StepValidator;