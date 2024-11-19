import IRecipe from '../types/IRecipe';
import axios from './axios';

async function addOneViewToRecipe(_id : IRecipe['_id']) : Promise<IRecipe | null> {
    try {
        const recipe = await axios.get(`/recipes/add-one-view?_id=${_id}`).then(res => res.data.data);
        if(!recipe) throw new Error('error adding view to the recipe');
        else {
            console.log('added view in server');
            return recipe
        }; 
    } catch (e) {
        console.log(e);
        return null;
    }
}


export default addOneViewToRecipe;