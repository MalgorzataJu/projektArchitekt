import React, {SyntheticEvent, useState} from 'react'
import './Login.css';


export const Login = () => {
    const [loginPar, setLoginPer] = useState({
        email:'',
        password:'',
    });

    const [isLogin, setIsLogin] = useState({
        stan:false,
        visibleDiv:false,
    });

    const changeForm = (key: string, value: any) => {
        setLoginPer(loginPar => ({
            ...loginPar,
            [key]:value,
        }));
    }

    const sendForm =async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginPar),
            });
            const data = await res.json();

            setIsLogin(isLogin => ({
                ...isLogin,
                stan:data.ok,
                visibleDiv: true,
            }));
        } finally {
            setIsLogin(isLogin => ({
                ...isLogin,
                stan:false,
                visibleDiv: true,
            }));
        }

        return` <Div>Witamy w domu</Div>`

    }

    if (isLogin.stan) {
        return <div>
            <p><strong>Witamy w domu</strong></p>
        </div>;
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
                value={loginPar.email}
                name='email'
                onChange={e =>changeForm("email", e.target.value)}
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
        <button type={'submit'}>ZALOGUJ</button>
        {/*<Btn text="Zaloguj" to='/login'/>*/}
    </form>
}
