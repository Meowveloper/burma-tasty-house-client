import axios from "../../utilities/axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import EnumAuthReducerActionTypes from "../../types/EnumAuthReducerActionTypes";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { EnumUserRoutes } from "../../types/EnumRoutes";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadForGoogleLogin } from "./Login";

export default function Register() {
    const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
    const [ name, setName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ normalRegisterLoading , setNormalRegisterLoading ] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div>
            <form className="px-3 mt-[50px]" onSubmit={ normalRegister }>
                <div className="text-h1 font-bold mb-5 text-center">Burma Tasty House</div>
                <div className="space-y-3">
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none"
                        placeholder="name"
                        type="text"
                        required
                    />
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none"
                        placeholder="email"
                        type="email"
                        required
                    />
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none"
                        placeholder="password"
                        type="text"
                        required
                    />
                    <div className="text-center">
                        <button type="submit" onClick={ normalRegister } className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[40px] rounded-small">
                            { !normalRegisterLoading && <span>Register</span> }
                            { normalRegisterLoading && <div className="auth-register-normal-register-loader mx-auto"></div> }
                        </button>
                    </div>
                </div>
                <div className="flex my-3 justify-center items-center w-full gap-2">
                    <div className="w-full h-[2px] dark:bg-dark-border"></div>
                    <div>or</div>
                    <div className="w-full h-[2px] dark:bg-dark-border"></div>
                </div>
                <div>
                    <div className="mt-5">
                        <GoogleOAuthProvider clientId={googleClientID}>
                            <GoogleLogin
                                onSuccess={(credentialResponse: CredentialResponse) => {
                                    onGoogleLoginSuccess(credentialResponse);
                                }}
                                onError={() => {
                                    alert("error login with google");
                                }}
                            ></GoogleLogin>
                        </GoogleOAuthProvider>
                    </div>
                </div>
                <div className="text-center mt-5">
                    already have an account? Login
                    <NavLink to="/auth/login" className="font-bold text-dark-text-highlight cursor-pointer"> here</NavLink>.
                </div>
            </form>
        </div>
    );

    function normalRegister (e : React.FormEvent) 
    {
        e.preventDefault();
        setNormalRegisterLoading(true);
        const data = {
            name : name, 
            email : email, 
            password : password
        }

        axios.post('/users/register', data).then(res => {
            console.log(res.data.data);
            if(res.status === 200) {
                authContext.dispatch({ type : EnumAuthReducerActionTypes.LoginOrRegister, payload : res.data.data });
                setName('');
                setEmail('');
                setPassword('');
                navigate('/');
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setNormalRegisterLoading(false);
        })
    }

    function onGoogleLoginSuccess(credentialResponse: CredentialResponse) {
        console.log(credentialResponse);
        if (credentialResponse.credential) {
            const userData = jwtDecode(credentialResponse.credential) as JwtPayloadForGoogleLogin;
            console.log("user data", userData);
            axios
                .post("/users/google-auth", {
                    email: userData.email,
                    name: userData.name,
                    avatar: userData.picture,
                })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        authContext.dispatch({ type: EnumAuthReducerActionTypes.LoginOrRegister, payload: res.data.data });
                        navigate(EnumUserRoutes.Home);
                    }
                }).catch(e => {
                    console.log(e);
                    alert("error login with google");
                });
        } else {
            alert("error login with google");
        }
    }
}
