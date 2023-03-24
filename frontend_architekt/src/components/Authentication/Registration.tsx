import React, {SyntheticEvent, useEffect, useState} from "react";

export const Registration = () => {
    const [errorInfo, setErrorInfo] = useState('');
    const [colorLabel, setColorLabel] = useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
        reapetPassword:'',
    })
    const [form, setForm] = useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
        reapetPassword:'',
    });

    const sendForm = async (e: SyntheticEvent) =>{
        e.preventDefault();
    }

    useEffect(() => {
        console.log("coś się dziej ale nie wiem jak to użyć")
    },[colorLabel]);

    const changeForm = (key: string, value:string) =>{
        setForm(form => ({
            ...form,
            [key]:value,
        }))
        setColorLabel(label => ({
            ...label,
            [key]: validation(value),
        }));
    }

    const validation =(name:string)=>{

        if (name === 'name'){
            if (form.name.length < 3){
                setErrorInfo('Za krótkie imię');
                return 'red';
            }
            setErrorInfo('');
            return 'green';
        }
        if (name === 'lastName') {
            if (form.lastName.length < 3) {
                setErrorInfo('Za krótkie Nazwisko');
                return 'red';
            }
            setErrorInfo('');
            return 'green';
        }
        if (name === 'email') {
            if ( form.email.length < 3 ||![form.email].includes('@')) {
                setErrorInfo('Email powinien zawierać @ oraz min 3 znaki');
                return 'red';
            }
            setErrorInfo('');
            return 'green';
        }
        if (name === 'password') {
            if ( form.password.length < 8 ) {
                setErrorInfo('Hasło powinno mieć min 8 znaków.');
                return 'red';
            }
            setErrorInfo('');
            return 'green';
        }
    }

    return <>
        <h1>Rejestracja</h1>
        <form onSubmit={sendForm}>
            <div style={{height:35}}>{errorInfo}</div>
            <label>
                Imię:
                <input
                    type="text"
                    name='name'
                    onChange={e =>changeForm("name", e.target.value)}
                    style={{
                        borderColor: `${colorLabel.name}`
                    }}
                />
            </label>
            <br/>
            <label>
                Nazwisko:
                <input
                    type="text"
                    name='lastName'
                    onChange={e =>changeForm("lasrName", e.target.value)}
                    style={{
                        borderColor: `${colorLabel.lastName}`
                    }}
                />
            </label>
            <br/>
            <label>
                email:
                <input
                    type="text"
                    name='email'
                    onChange={e =>changeForm("email", e.target.value)}
                    style={{
                        borderColor: `${colorLabel.email}`
                    }}
                />
            </label>
            <br/>
            <label>
                Hasło:
                <input
                    type="password"
                    name='password'
                    onChange={e =>changeForm("password", e.target.value)}
                    style={{
                        borderColor: `${colorLabel.password}`
                    }}
                />
            </label>
            <br/>
            <label>
                Hasło powtórzone:
                <input
                    type="password"
                    name='password2'
                    onChange={e =>changeForm("password2", e.target.value)}
                    style={{
                        borderColor: `${colorLabel.reapetPassword}`
                    }}
                />
            </label>
            <br/>
            <button type={'submit'}>ZAREJESTRUJ</button>
        </form>
    </>
}