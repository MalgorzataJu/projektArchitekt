import React, {SyntheticEvent, useState} from 'react'
import './Login.css';
import {Btn} from "../common/Btn/Btn";


export const Login = () => {
    const [loginPar, setLoginPer] = useState({
        login:'',
        password:'',
    });

    const [isLogin, setIsLogin] = useState({
        stan:false,
        count:0,
        visibleDiv:false,
    });

    const changeForm = (key: string, value: any) => {

        setIsLogin(isLogin => ({
            ...isLogin,
            stan:false,
            visibleDiv: false,
        }));

        setLoginPer(loginPar => ({
            ...loginPar,
            [key]:value,
        }));
    }

    const sendForm =async (e: SyntheticEvent) => {
        e.preventDefault();

         const loginStan = [loginPar.login].includes('@')  && (loginPar.password.length > 0);

        setIsLogin({
            stan:loginStan,
            count:isLogin.count+1,
            visibleDiv:true,
        });
    }

    return <form onSubmit={sendForm}>
        <h1>LOGOWANIE</h1>
        <div
            style={{
                color:`${ isLogin.stan ?'green':'red'}`,
                display: `${!isLogin.visibleDiv?'none':'block'}`,
            }}
        >
            {
                isLogin.stan ? `Zalogowano poprawnie!` : 'Niepoprawne dane!'
            }
        </div>
        <label>
            Login:<br/>
            <input
                type="text"
                value={loginPar.login}
                name='login'
                onChange={e =>changeForm("login", e.target.value)}
            />
        </label>
        <br/>
        <label>
            Password:<br/>
            <input
                type="password"
                value={loginPar.password}
                name='password'
                onChange={e =>changeForm("password", e.target.value)}
            />
        </label>
        <br/>
        {/*<button type={'submit'}>ZALOGUJ</button>*/}
        <Btn text="Zaloguj" to='/login'/>
    </form>
}
