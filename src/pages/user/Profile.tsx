import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "../../utilities/axios";
import IUser from "../../types/IUser";
import IRecipe from "../../types/IRecipe";
import RecipeCard from "../../components/user/general/RecipeCard";
export default function Profile() {
    const authContext = useContext(AuthContext);
    const params = useParams();
    const userId = params.id;
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        console.log("checking infinite loop from pages/user/Profile.tsx");
        axios
            .get(`/users/user-with-recipe/${userId}`)
            .then(res => {
                console.log(res);
                setUser(res.data.data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div>Loading.....</div>;

    return (
        <div>
            <div className="text-h1">
                {user.name}'s Profile {user._id === authContext.user?._id && <span className="font-bold dark:text-dark-text-highlight">(You)</span>}
            </div>
            <div className="text-h2">email - {authContext.user?.email}</div>

            <div>
                <div className="text-h1 font-bold">Recipes</div>
                <div className="grid grid-cols-2 gap-4">{!!user.recipes?.length && (user.recipes as IRecipe[]).map((item: IRecipe) => <RecipeCard key={item._id} recipe={item}></RecipeCard>)}</div>
            </div>
        </div>
    );
}
