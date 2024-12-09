import IRecipe from "./IRecipe";

interface IUser {
    _id : string; 
    name : string;
    email : string;
    password : string;
    avatar? : string;
    role : boolean;
    recipes? : IRecipe["_id"][] | IRecipe[];
    comments? : string;
    followers? : Array<IUser["_id"] | IUser>;
    followings? : Array<IUser["_id"] | IUser>;
    saves? : Array<IRecipe["_id"] | IRecipe>;
    createdAt? : string;
    updatedAt? : string;
}

export default IUser;