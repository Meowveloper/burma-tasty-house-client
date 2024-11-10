import IRecipe from "./IRecipe";

interface ITag {
    _id : string;
    name : string;
    recipes? : Array<string> | Array<IRecipe>;
}
export default ITag;