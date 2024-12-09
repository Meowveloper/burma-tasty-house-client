
import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "../../utilities/axios";
import IUser from "../../types/IUser";
import { AuthContext } from "../../contexts/AuthContext";
import UserCard from "../../components/user/general/UserCard";
export default function YourFollowers() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);

    const fetchUsers = useMemo(() => getFetchUsersFunction(setUsers, setLoading), [setUsers, setLoading]);
    useEffect(() => {
        console.log("checking infinite loop from pages/user/PeopleYouFollowed.tsx");
        fetchUsers();
    }, [fetchUsers]);
    return (
        <div>
            <div className="text-h2 font-bold mb-4">Your Followers</div>
            {loading ? (
                <div>Loading.....</div>
            ) : !users.length ? (
                <div className="col-span-2 tablet:col-span-3 desktop:col-span-4">No users found..., nobody follows you</div>
            ) : (
                <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4">
                    {users.map(user => (
                        <UserCard user={user} key={user._id} authContext={authContext}></UserCard>
                    ))}
                </div>
            )}
        </div>
    );
}

function getFetchUsersFunction(setUsers: React.Dispatch<React.SetStateAction<IUser[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return async function () {
        try {
            setLoading(true);
            const result = await axios.get("/users/get-your-followers");
            console.log(result);
            setUsers(result.data.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
}