import { Icon } from "@iconify/react/dist/iconify.js";
import axios from '../../utilities/axios';
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import EnumAuthReducerActionTypes from "../../types/EnumAuthReducerActionTypes";

export default function Login()
{
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ normalLoginLoading, setNormalLoginLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    
    // useEffect(() => {
    //     if(authContext.user) {
    //         navigate(authContext.user.role ? EnumAdminRoutes.Home : EnumUserRoutes.Home);
    //     }
    // });

    return (
        <div>
            <form className="px-3 mt-[50px]" onSubmit={ normalLogin }>
                <div className="text-h1 font-bold mb-5 text-center">Burma Tasty House</div>
                <div className="space-y-3">
                    <input onChange={ (e : React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); } } value={email} className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none" placeholder="email" type="email" />
                    <input onChange={ (e : React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); } } value={password} className="dark:bg-dark-card rounded-small w-full px-3 py-2 outline-none" placeholder="password" type="text" />
                    <div className="text-center">
                        <button onClick={ normalLogin } type="submit" className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[40px] rounded-small">
                            { !normalLoginLoading && <span>Login</span> }
                            { normalLoginLoading && <div className="auth-register-normal-register-loader mx-auto"></div> }
                        </button>
                    </div>
                </div>
                <div className="flex my-3 justify-center items-center w-full gap-2">
                    <div className="w-full h-[2px] dark:bg-dark-border"></div>
                    <div>or</div>
                    <div className="w-full h-[2px] dark:bg-dark-border"></div>
                </div>
                <div>
                    <div className="text-h3 font-bold text-center">Login with</div>
                    <div className="flex justify-center items-center gap-7 mt-5">
                        <Icon icon="flat-color-icons:google" width="2.2em" height="2.2em" />
                        <Icon icon="logos:facebook" width="2.2em" height="2.2em" />
                    </div>
                </div>
                <div className="text-center mt-5">
                    does not have an account? Register
                    <NavLink to="/auth/register" className="font-bold text-dark-text-highlight cursor-pointer"> here</NavLink>.
                </div>            
            </form>
        </div>
    );

    function normalLogin (e : React.FormEvent) 
    {
        e.preventDefault();
        setNormalLoginLoading(true);
        axios.post('/users/login', { email, password }).then(res => {
            console.log(res);
            if(res.status === 200) {
                authContext.dispatch({ type : EnumAuthReducerActionTypes.LoginOrRegister, payload : res.data.data });
                setEmail('');
                setPassword('');
                navigate('/');
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setNormalLoginLoading(false);
        });
    }
}
