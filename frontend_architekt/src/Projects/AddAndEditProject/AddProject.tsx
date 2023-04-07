import React, {FormEvent, useEffect, useState} from 'react';
import {CreateProject, ProjectItemEntity} from 'types';
import {Spinner} from "../../components/common/spiner/spinner";
import './AddProject.css';
import {Card} from "react-bootstrap";
import {ProjectsView} from "../../views/ProjectsView";
import axios from "axios";

export const AddProject = () => {
    const [form, setForm] = useState<CreateProject>({
        name: '',
        startDate:new Date().toLocaleDateString('en-CA'),
        endDate: new Date().toLocaleDateString('en-CA'),
        description: '',
        quantityHours: 50,
        contact: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState< {status:boolean, message:string}>({
        status: false,
        message: '',
    });

    const updateForm = (key: string, value: any) => {

        if (form.name === null || form.name.length < 3)
            setResultInfo({status: false, message: "Nazwa powinna być dłuższa niż 3 znaki."})
        else setResultInfo({status: false, message: ""});

        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    useEffect(() => {

    }, [form]);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await axios.post(`http://localhost:3001/project`, form,
            {withCredentials: true}
            );
            const data: ProjectItemEntity = await res.data;

            setResultInfo({status: true, message:`${data.name} has been created.`});
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo.status) {
        return  <ProjectsView/>
    }

    return <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "500px", minWidth: "500px"}}
            ><Card>
            <Card.Header><h2>Dodaj projekt</h2></Card.Header>
            <Card.Body>
                <p>{resultInfo.message}</p>
            <form onSubmit={sendForm} className="AddProject">
            <div className='LabelForm'>
                <label>
                    Nazwa projektu:
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
                    Opis projektu:
                    <textarea
                        className="InputForm"
                        name="description"
                        value={form.description}
                        onChange={e => updateForm('description', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Początek realizacji:
                    <input
                        className="InputForm"
                        type="date"
                        name = "startDate"
                        value={form.startDate}
                        onChange={e => updateForm('startDate', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label >
                    Koniec realizacji:
                    <input
                        className="InputForm"
                        type="date"
                        name = "endDate"
                        value={form.endDate}
                        onChange={e => updateForm('endDate', e.target.value)}
                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Planowane godziny:
                    <input
                        className="InputForm"
                        type="number"
                        name="quantityHours"
                        value={form.quantityHours}
                        onChange={e => updateForm('quantityHours', e.target.value)}
                    /><br/>
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Kontakt:
                    <input
                        className="InputForm"
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={e => updateForm('contact', e.target.value)}
                    /><br/>
                </label>
            </div>
            <button className="ButtonForm" type="submit">Dodaj</button>
        </form>
    </Card.Body>
   </Card>
  </div>
</>
};
