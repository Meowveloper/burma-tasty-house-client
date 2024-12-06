import IStep from "./IStep";
import ITag from "./ITag";
import IUser from "./IUser";
import IComment from "./IComment";

interface IRecipe {
    _id? : string;
    title : string;
    image : File | string | null;
    video : File | string | null;
    description : string;
    preparation_time : number;
    difficulty_level : number;
    tags : Array<string | ITag>;
    ingredients : Array<string>;
    user : string | IUser;  
    views : number;
    comments : Array<string | IComment>;
    steps : IStep[]; 
    createdAt? : Date; 
    updatedAt? : Date;
}

export default IRecipe;