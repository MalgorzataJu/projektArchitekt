import React, {FormEvent, useState} from 'react';
import {Spinner} from "../../components/common/spiner/spinner";
import './AddEmployee.css';
import {CreateEmpoyeeRecord} from "../../types";

interface Props {
    onEmployeeChange: () => void;
}

export const AddEmployee = (props:Props) => {
    const [form, setForm] = useState<CreateEmpoyeeRecord>({
        name: '',
        surname: '',
        email: '',
        password: '',
        hourlyrate: 0,

    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/api/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data: string = await res.json();
            setResultInfo(`${data} has been created.`);

        } finally {
            setLoading(false);
        }
        props.onEmployeeChange();
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>
            <button onClick={() => setResultInfo(null)}>Add another one</button>
        </div>;
    }

    return <>
        <h2>Dodaj Pracownika</h2>
        <form onSubmit={sendForm} className="AddEmployee">
            <div className='LabelForm'>
                <label>
                    Imię:
                    <input
                        className="InputForm"
                        type="text"
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    /><br/>
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Nazwisko:
                    <input
                        className="InputForm"
                        type="text"
                        name="surname"
                        value={form.surname}
                        onChange={e => updateForm('surname', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    e-mail:
                    <input
                        className="InputForm"
                        type="text"
                        name="emial"
                        value={form.email}
                        onChange={e => updateForm('email', e.target.value)}
                    /><br/>
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Hasło:
                    <input
                        className="InputForm"
                        type="text"
                        name = "password"
                        value={form.password}
                        onChange={e => updateForm('password', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label >
                    Stawka godzinowa:
                    <input
                        className="InputForm"
                        type="number"
                        name = "hourlyrate"
                        value={form.hourlyrate}
                        onChange={e => updateForm('hourlyrate', e.target.value)}
                    />
                </label>
            </div>
            <button className="ButtonForm" type="submit">Dodaj</button>
        </form>
    </>
};