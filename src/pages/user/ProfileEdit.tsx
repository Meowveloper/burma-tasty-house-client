import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import IUser from "../../types/IUser";
import updateObjectFields from "../../utilities/updateObjectFields";
import axios from '../../utilities/axios';
import EnumAuthReducerActionTypes from "../../types/EnumAuthReducerActionTypes";
import { useNavigate } from "react-router-dom";
import { EnumUserRoutes } from "../../types/EnumRoutes";
import GoogleLoginWarning from "../../components/general/GoogleLoginWarning";
export default function ProfileEdit() {
    const authContext = useContext(AuthContext);
    const hiddenImageInput = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState<IUser | null>(authContext.user);
    const [newPassword, setNewPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const imagePreview = useMemo(() => getImagePreview(user?.avatar), [user?.avatar]);
    useEffect(() => {
        console.log("checking infinite loop from pages/user/ProfileEdit.tsx");
        imagePreview();
    }, [imagePreview]);
    if (!user) return;
    const updateUserFields = updateObjectFields<IUser, keyof IUser>(user);
    return (
        <div>
            <div className="text-h2 font-bold">Edit your profile</div>
            <div className="text-red-400 font-bold">Please note that you cannot change your email.</div>
            <GoogleLoginWarning></GoogleLoginWarning>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                {/* name */}
                <div>
                    <div>Name</div>
                    <input onChange={handleChangeName} value={user.name} type="text" required placeholder="eg: food lover" className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none placeholder:text-gray-500" />
                </div>
                {/* name end */}

                {/* email */}
                <div>
                    <div>Email</div>
                    <input value={user.email} type="email" disabled required className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none placeholder:text-gray-500" />
                </div>
                {/* email end */}

                {/* password */}
                {user.password && (
                    <>
                        <div>
                            <div>new password</div>
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" required className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none placeholder:text-gray-500" />
                        </div>
                        <div>
                            <div>old password</div>
                            <input value={oldPassword} onChange={e => setOldPassword(e.target.value)} type="password" required className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none placeholder:text-gray-500" />
                        </div>
                    </>
                )}
                {/* password end */}

                {/* avatar */}
                <div>
                    <div>Avatar</div>
                    <div
                        onClick={() => {
                            hiddenImageInput.current?.focus();
                            hiddenImageInput.current?.click();
                        }}
                        className="dark:bg-dark-card text-center border dark:border-dark-border rounded-small w-full px-3 py-2 outline-none"
                    >
                        Browse File
                    </div>
                    <input onChange={handleChangeAvatar} ref={hiddenImageInput} type="file" accept="image/*" className="hidden" />
                    {!!imagePreview() && <img src={imagePreview()} className="w-full rounded-lg mt-3 h-[250px] desktop:w-[50%] desktop:h-[450px] block tablet:mx-auto tablet:w-[80%] tablet:h-[350px]" alt="" />}
                </div>
                {/* avatar end */}
                <div>
                    { loading ? (
                        <div className="recipe-form-loader mx-auto"></div>
                    ) : (
                        <button type="submit" className="w-[141px] h-[50px] mx-auto bg-dark-card rounded-lg block">Save</button>
                    ) }
                </div>
            </form>
        </div>
    );

    function handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
        const name = e.target.value;
        const updateUserName = updateUserFields("name");
        setUser(updateUserName(name));
    }

    function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>): void {
        const avatar = e.target.files?.[0];
        if (!avatar) return;
        const updateAvatar = updateUserFields("avatar");
        setUser(updateAvatar(avatar));
    }

    function getImagePreview(avatar: IUser["avatar"]): () => string | undefined {
        return function (): string | undefined {
            if (!avatar) return undefined;
            if (typeof avatar === "string") return avatar;
            return URL.createObjectURL(avatar);
        };
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/users/update-profile', {
                ...user, 
                oldPassword : user?.password ? oldPassword : null,
                newPassword : user?.password ? newPassword : null
            })
            console.log(response);
            if (response.status === 200) {
                authContext.dispatch({ type: EnumAuthReducerActionTypes.LoginOrRegister, payload: response.data.data });
                navigate(EnumUserRoutes.Home);
            } else throw new Error('something went wrong');
        } catch (e) {
            console.log(e);
            alert('something went wrong');
        } finally {
            setLoading(false);
        }
    }
}
