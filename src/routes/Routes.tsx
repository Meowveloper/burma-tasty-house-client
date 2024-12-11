import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import UserHome from "../pages/user/Home";
import AdminLayout from "../layouts/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import UserRecipeCreate from "../pages/user/RecipeCreate";
import UserRecipeUpdate from "../pages/user/RecipeUpdate";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { EnumAdminRoutes, EnumUserRoutes } from "../types/EnumRoutes";
import ProtectedRoutes from "../components/general/ProtectedRoutes";
import UserProfile from "../pages/user/Profile";
import UnauthenticatedRoutes from "../components/general/UnAuthenticatedRoutes";
import { StepsToDeleteContextProvider } from "../contexts/StepsToDeleteContext";
import { TagsToDeleteContextProvider } from "../contexts/TagsToDeleteContext";
import UserRecipesWithPagination from "../pages/user/RecipesWithPagination";
import IRecipe from "../types/IRecipe";
import SavedRecipes from "../pages/user/SavedRecipes";
import PeopleYouFollowed from "../pages/user/PeopleYouFollowed";
import YourFollowers from "../pages/user/YourFollowers";
import UserProfileEdit from "../pages/user/ProfileEdit";
import Browse from "../pages/user/Browse";

const recipeSorts : { [K in keyof Partial<IRecipe>] : K } = {
    createdAt : 'createdAt',
    views : 'views',
    comments : 'comments'
}
export default function Routes() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <UserLayout />,
            children: [
                {
                    path: EnumUserRoutes.Home,
                    element: <UserHome />,
                },
                {
                    path : `${EnumUserRoutes.LatestRecipes}/:page`,
                    element : <UserRecipesWithPagination sort={recipeSorts.createdAt!} needAuth={false}/>
                },
                {
                    path : `${EnumUserRoutes.HighestViewRecipes}/:page`,
                    element : <UserRecipesWithPagination sort={recipeSorts.views!} needAuth={false}/>
                },
                {
                    path : `${EnumUserRoutes.HighestCommentRecipes}/:page`,
                    element : <UserRecipesWithPagination sort={recipeSorts.comments!} needAuth={false}/>
                },
                {
                    path : `${EnumUserRoutes.Browse}/:page`,
                    element : <Browse sort={recipeSorts.createdAt!}></Browse>
                },
                {
                    path : `${EnumUserRoutes.PeopleYouFollowRecipes}/:page`,
                    element : (
                        <ProtectedRoutes>
                            <UserRecipesWithPagination sort={recipeSorts.createdAt!} needAuth={true}/>
                        </ProtectedRoutes>
                    )
                },
                {
                    path : `${EnumUserRoutes.SavedRecipes}`, 
                    element : (
                        <ProtectedRoutes>
                            <SavedRecipes></SavedRecipes>
                        </ProtectedRoutes>
                    ) 
                },
                {
                    path: EnumUserRoutes.PeopleYouFollowed, 
                    element: (
                        <ProtectedRoutes>
                            <PeopleYouFollowed></PeopleYouFollowed>
                        </ProtectedRoutes>
                    )
                }, 
                {
                    path: EnumUserRoutes.YourFollowers, 
                    element: (
                        <ProtectedRoutes>
                            <YourFollowers></YourFollowers>
                        </ProtectedRoutes>
                    )
                },
                {
                    path: EnumUserRoutes.RecipeCreate,
                    element: (
                        <ProtectedRoutes>
                            <StepsToDeleteContextProvider>
                                <TagsToDeleteContextProvider>
                                    <UserRecipeCreate />
                                </TagsToDeleteContextProvider>
                            </StepsToDeleteContextProvider>
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: `${EnumUserRoutes.RecipeUpdate}/:id`,
                    element: (
                        <ProtectedRoutes>
                            <StepsToDeleteContextProvider>
                                <TagsToDeleteContextProvider>
                                    <UserRecipeUpdate />
                                </TagsToDeleteContextProvider>
                            </StepsToDeleteContextProvider>
                        </ProtectedRoutes>
                    )
                },
                {
                    path: `${EnumUserRoutes.Profile}/:id`,
                    element: (
                        <ProtectedRoutes>
                            <UserProfile />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: EnumUserRoutes.ProfileEdit, 
                    element: (
                        <ProtectedRoutes>
                            <UserProfileEdit></UserProfileEdit>
                        </ProtectedRoutes>
                    )
                },
                {
                    path: "*",
                    element: (
                        <ProtectedRoutes>
                            <UserHome></UserHome>
                        </ProtectedRoutes>
                    ),
                },
            ],
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: EnumAdminRoutes.Home,
                    element: (
                        <ProtectedRoutes isAdminRoute={true}>
                            <AdminHome />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: "*",
                    element: (
                        <ProtectedRoutes isAdminRoute={true}>
                            <UserHome></UserHome>
                        </ProtectedRoutes>
                    ),
                },
            ],
        },
        {
            element: <UserLayout />,
            children: [
                {
                    path: EnumUserRoutes.Login,
                    element: (
                        <UnauthenticatedRoutes>
                            <Login></Login>
                        </UnauthenticatedRoutes>
                    ),
                },
                {
                    path: EnumUserRoutes.Register,
                    element: (
                        <UnauthenticatedRoutes>
                            <Register></Register>
                        </UnauthenticatedRoutes>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={routes} />;
}
