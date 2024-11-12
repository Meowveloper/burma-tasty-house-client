import IRecipe from "./IRecipe";

interface IUser {
    _id : string; 
    name : string;
    email : string;
    password : string;
    avatar? : string;
    role : boolean;
    recipes? : string[] | IRecipe[];
    comments? : string;
}

export default IUser;