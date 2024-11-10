interface IStep {
    _id? : string;
    recipe_id? : string;
    description : string;
    image : File | string | undefined;
    sequence_number : number;
}

export default IStep;