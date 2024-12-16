import IComment from "./IComment";
import IRecipe from "./IRecipe";
interface IReport {
    _id? : string;
    recipe : IRecipe['_id'];
    comment : IComment['_id'];
    body : string;
    createdAt? : Date;
    updatedAt? : Date;
}


export default IReport;