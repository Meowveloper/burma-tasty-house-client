import IRecipe from "./IRecipe";
import IUser from "./IUser";
interface IComment {
    _id? : string;
    recipe : IRecipe['_id'];
    user : IUser['_id'] | IUser;
    body : string, 
    replies? : Array<IComment['_id']> | Array<IComment>;
}

export default IComment;

