import React, {FormEvent, useEffect, useState} from 'react';
import {Spinner} from "../../components/common/spiner/spinner";
import {EmployeeResAllInfo} from 'types';
import {Card} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";
import {EmployeesView} from "../../views/EmployeesView";
import {apiUrl} from "../../config/api";

export const EditEmployee = () => {
    const {idOfEmployee} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState< {status:boolean, message:string}>({
        status: false,
        message: '',
    });
    const [form, setForm] = useState<EmployeeResAllInfo>({
        name: '',
        lastname: '',
        email: '',
        hourly: 0,
        authStrategy: '',
    });

    useEffect(() => {
        (async () => {

            const res =await axios.get(`${apiUrl}/employee/${idOfEmployee}`, {
                withCredentials: true,
            });
            const employee = await res.data;

            setForm({
                name: employee.name,
                lastname:employee.lastname,
                email: employee.email,
                authStrategy:employee.authStrategy,
                hourly: employee.hourly,
            });
        })();
    }, []);

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
            const res = await axios.put(`${apiUrl}/employee/${idOfEmployee}`, form,
                {withCredentials: true}
                );
            const data = await res.data;

            setResultInfo({status: true, message: `${data.name} has been changed.`});
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo.status) {
        return  <EmployeesView/>
    }

    return <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{  minWidth: "500px", }}
            ><Card>
            <Card.Header><h2>Edytuj dane pracownika:</h2></Card.Header>
            <Card.Body>
                <div>{resultInfo.message}</div>
            <form onSubmit={sendForm} className="AddEmployee">
            <div className='LabelForm'>
                <label>
                    Nazwisko:
                    <input
                        className="InputForm"
                        name="lastname"
                        type="text"
                        value={form.lastname}
                        onChange={e => updateForm('lastname', e.target.value)}
                    /><br/>
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Imie:
                    <textarea
                        className="InputForm"
                        name="name"
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    email:
                    <input
                        className="InputForm"
                        type="text"
                        name = "email"
                        value={form.email}
                        onChange={e => updateForm('email', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label >
                    Rola w systemie:
                    <input
                        className="InputForm"
                        type="text"
                        name = "authStrategy"
                        value={form.authStrategy}
                        onChange={e => updateForm('authStrategy', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Stawka:
                    <input
                        className="InputForm"
                        type="number"
                        name="hourly"
                        value={form.hourly}
                        onChange={e => updateForm('hourly', e.target.value)}
                    /><br/>
                </label>
            </div>

            <button className="ButtonForm" type="submit">Zapisz zmiany</button>
        </form>
    </Card.Body>
   </Card>
  </div>
</>
};
