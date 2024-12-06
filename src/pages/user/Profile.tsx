import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import axios from "../../utilities/axios";
import IUser from "../../types/IUser";
import IRecipe from "../../types/IRecipe";
import RecipeCard from "../../components/user/general/RecipeCard";
import RecipeDetail from "./RecipeDetail";
import { deleteRecipeInBackendAndRemoveRecipeFromStates } from "../../utilities/generalHelperFunctions";
import EnumAuthReducerActionTypes from "../../types/EnumAuthReducerActionTypes";
export default function Profile(): JSX.Element {
    const authContext = useContext(AuthContext);
    const params = useParams();
    const userId = params.id;
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [recipeToShow, setRecipeToShow] = useState<IRecipe | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [followLoading, setFollowLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        console.log("checking infinite loop from pages/user/Profile.tsx");
        axios
            .get(`/users/user-with-recipe/${userId}`)
            .then(res => {
                console.log('profile\'s user', res.data.data);
                setUser(res.data.data);
                setRecipes(res.data.data.recipes);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div>Loading.....</div>;

    const deleteRecipeAndRemoveFromUserRecipes = deleteRecipeInBackendAndRemoveRecipeFromStates(recipeToShow?._id, [setRecipes], () => {
        setRecipeToShow(null);
    });

    if (recipeToShow) return <RecipeDetail recipeToShow={recipeToShow} user={authContext.user} setRecipeToShow={setRecipeToShow} deleteRecipe={deleteRecipeAndRemoveFromUserRecipes} />;

    return (
        <div>
            <div className="bg-dark-card px-4 py-5 rounded-xl w-fit">
                <img className="block mx-auto h-24 rounded-full w-24 mb-5" src={user.avatar ? user.avatar : "/image-placeholder.jpg"} alt="user profile" />
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg  font-semibold">
                            {user.name}'s Profile {user._id === authContext.user?._id && <span className="font-bold dark:text-dark-text-highlight">(You)</span>}
                        </p>
                        <p className="text-slate-500 font-medium">{user.email}</p>
                    </div>

                    {/* follow button */}
                    {userId !== authContext.user?._id && !checkIfAlreadyFollowed() && (
                        <button onClick={addFollowings} className="px-4 py-1 text-sm text-dark-text-highlight font-semibold rounded-full border border-dark-border hover:text-white hover:bg-dark-secondary-card hover:border-transparent">
                            Follow
                        </button>
                    )}

                    {/* un follow button */}
                    {userId !== authContext.user?._id && checkIfAlreadyFollowed() && (
                        <button onClick={removeFollowings} className="px-4 py-1 text-sm text-white font-semibold rounded-full bg-dark-secondary-card">
                            already followed
                        </button>
                    )}
                    {followLoading && <div className="recipe-form-loader mx-auto"></div>}
                </div>
            </div>

            <div className="mt-5">
                <div className="text-h1 font-bold mb-4">{user.name}'s Recipes</div>
                { !recipes?.length && <div className="text-h3 font-bold">No recipes found</div>}
                <div className="grid grid-cols-2 desktop:grid-cols-3 gap-4">{!!recipes?.length && (recipes as IRecipe[]).map((item: IRecipe) => <React.Fragment key={item._id}>{RecipeCard(item, authContext)(setRecipeToShow)}</React.Fragment>)}</div>
            </div>
        </div>
    );

    async function addFollowings() {
        // if not logged in return
        if (!authContext.user) return;

        const follower = authContext.user._id;
        const followed = userId;

        try {
            // set loading to true
            setFollowLoading(true);

            // call api
            const response = await axios.post("/users/add-followings", { follower, followed });

            // check response
            if (response.status === 200) {
                console.log(response);

                // update auth context
                authContext.dispatch({
                    type: EnumAuthReducerActionTypes.LoginOrRegister,
                    payload: userWithOneMoreFollowings(authContext.user, userId),
                });

                // send notification
            } else {
                alert("error while following the user");
            }
        } catch (error) {
            console.log(error);
            alert("error while following the user");
        } finally {
            // set loading to false
            setFollowLoading(false);
        }
    }

    async function removeFollowings() {
        if (!authContext.user) return;

        const follower = authContext.user._id;
        const followed = userId;

        try {
            // set loading to true
            setFollowLoading(true);

            // call api
            const response = await axios.post("/users/remove-followings", { follower, followed });

            // check response
            if (response.status === 200) {
                console.log(response);

                // update auth context
                authContext.dispatch({
                    type: EnumAuthReducerActionTypes.LoginOrRegister,
                    payload: userWithOneLessFollowings(authContext.user, userId),
                });
            } else {
                alert("error while un-following the user");
            }
        } catch (error) {
            console.log(error);
            alert("error while un-following the user");
        } finally {
            // set loading to false
            setFollowLoading(false);
        }
    }

    function checkIfAlreadyFollowed(): boolean {
        if (!authContext.user) return false;
        if (!userId) return false;

        if (!authContext.user.followings) return false;

        const isFollowed = authContext.user.followings.find((item: IUser["_id"] | IUser) => {
            if (typeof item === "string") return item === userId;
            else return item._id === userId;
        });

        return !!isFollowed;
    }

    function userWithOneMoreFollowings(user: IUser, followingId: IUser["_id"] | undefined): IUser {
        if (!user) return user;
        if (!followingId) return user;
        const newFollowings = user.followings ? [...user.followings, followingId] : [followingId];
        return { ...user, followings: newFollowings };
    }

    function userWithOneLessFollowings(user: IUser, followingId: IUser["_id"] | undefined): IUser {
        if (!user) return user;
        if (!followingId) return user;
        const newFollowings = user.followings
            ? user.followings.filter((item: IUser["_id"] | IUser) => {
                  if (typeof item === "string") return item !== followingId;
                  else return item._id !== followingId;
              })
            : [];
        return { ...user, followings: newFollowings };
    }
}
