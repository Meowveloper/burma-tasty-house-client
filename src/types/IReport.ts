import IComment from "./IComment";
import IRecipe from "./IRecipe";
interface IReport {
    _id? : string;
    recipe : IRecipe['_id'] | IRecipe;
    comment : IComment['_id'] | IComment;
    body : string;
    is_comment_report? : boolean;
    createdAt? : Date;
    updatedAt? : Date;
}


export default IReport;