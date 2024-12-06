import IPagination from "../types/IPagination";
import axios from "./axios";
function getFetchRecipesWithPaginationFunction<T>(url : string) : () => Promise<{ data : T, pagination : IPagination}> {
    return async function () : Promise<{ data : T, pagination : IPagination}> {
        try {
            const response = await axios.get(url);
            if(response.status !== 200) throw new Error('error fetching recipes');
            return {
                data : response.data.data, 
                pagination : response.data.pagination
            }
        } catch (e) {
            console.log(e);
            throw new Error((e as Error).message || 'error fetching recipes');
        }
    };
}

export default getFetchRecipesWithPaginationFunction;
