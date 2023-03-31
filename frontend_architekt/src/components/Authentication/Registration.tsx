import React, {SyntheticEvent, useEffect, useState} from "react";
import {Spinner} from "../common/spiner/spinner";
import {EmployeeTableRow} from "../../Employees/EmployeeTableRow";

export const Registration = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | undefined>(false);
    const [resultInfo, setResultInfo] = useState({
        isOk:false,
        message:'',
    });

    const [errorLabel, setErrorLabel] = useState({
        name:'',
        lastname:'',
        email:'',
        password:'',
        confirm:'',
    })
    const [form, setForm] = useState({
        name:'',
        lastname:'',
        email:'',
        password:'',
        confirm:'',
        hourly:0,
    });

    const sendForm = async (e: SyntheticEvent) =>{
        e.preventDefault();

        // setLoading(true);
        if (isValid)
            console.log('Walidacja pomyślna');

        console.log(errorLabel)
        try {
            const res = await fetch(`http://localhost:3001/employee/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setResultInfo(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // console.log(errorLabel)
        setIsValid(validationAll());
    },[form, isValid]);

    const changeForm = (key: string, value:string) =>{
        setForm(form => ({
            ...form,
            [key]:value,
        }))
    }

    const validation = (key: string): boolean => {

        let text = 'true';
        if (key === 'name' && form.name.length < 3)
            text = 'Imie jest za krótkie.';
        if (key === 'lastname' && form.lastname.length < 3)
            text = 'Nazwisko jest za krótkie.';
        if ((key == 'email') && (form.email.length < 3 || !form.email.includes('@')))
            text = 'Email powinien zawierać @ oraz min 3 znaki.';
        if ( key === 'password' && form.password.length < 8 )
            text = 'Hasło powinno mieć min 8 znaków.';
        if ( key === 'confirm' && form.password !== form.confirm )
            text= 'Hasła nie są identyczne.';

            setErrorLabel(label => ({
                ...label,
                [key]: text,
            }));

        return text == '';
    }
    const validationAll = ():boolean | undefined=> {
        for (const key in errorLabel)
            if (Object(errorLabel)[key]  !== 'true' )
                return false;
        return true;
    }

    const changeColor = (label : string):string => {
        let color = '';
        if (Object(errorLabel)[label] === 'true')
            color = 'green';
         else  if (Object(errorLabel)[label] !== '')
            color = 'red';
        return color;
    }

    const printError = () => ( Object.values(errorLabel).map(el =>(el !==''? el !== 'false' ? el !== 'true'?`${el}`:'':'':'')));

    if (loading) {
        return <Spinner/>;
    }
    return <>
        <h1>Rejestracja</h1>
        <div
        style = {{height: '30px', color:'red'}}
        >{printError()}</div>
        <form onSubmit={sendForm}>
            <div>{resultInfo.message}</div>
            <label>
                Imię:
                <input
                    type="text"
                    name='name'
                    onChange={e =>changeForm("name", e.target.value)}
                    onKeyUp={e => validation("name")}
                    style={{
                        borderColor: `${changeColor("name")}`
                    }}
                />
            </label>
            <br/>
            <label>
                Nazwisko:
                <input
                    type="text"
                    name='lastName'
                    onChange={e =>changeForm("lastname", e.target.value)}
                    onKeyUp={e => validation("lastname")}
                    style={{
                        borderColor:  `${changeColor("lastname")}`
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
                    onKeyUp={e => validation("email")}
                    style={{
                        borderColor:  `${changeColor("email")}`
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
                    onKeyUp={e => validation("password")}
                    style={{
                        borderColor:  `${changeColor("password")}`
                    }}
                />
            </label>
            <br/>
            <label>
                Hasło powtórzone:
                <input
                    type="password"
                    name='confirm'
                    onChange={e =>changeForm("confirm", e.target.value)}
                    onKeyUp={e => validation("confirm")}
                    style={{
                        borderColor:  `${changeColor("confirm")}`
                    }}
                />
            </label>
            <br/>
            <label>
                Stawka godzinowa:
                <input
                    type="number"
                    name='hourly'
                    onChange={e =>changeForm("hourly", e.target.value)}
                    onKeyUp={e => validation("hourly")}

                />
            </label>
            <br/>
                <button
                    style={{
                        borderColor: `${!isValid? 'red': 'green'}`
                    }}
                    disabled={!isValid}
                    type={'submit'}>ZAREJESTRUJ</button>
        </form>
    </>
}
