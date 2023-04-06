import React, {FormEvent, useState} from 'react';
import {CreateProject, ProjectItemEntity} from 'types';
import {Spinner} from "../../components/common/spiner/spinner";
import './AddProject.css';
import {Card} from "react-bootstrap";

export const AddProject = () => {
    const [form, setForm] = useState<CreateProject>({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        quantityHours: 50,
        contact: '',

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
            const res = await fetch(`http://localhost:3001/project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data: ProjectItemEntity = await res.json();

            setResultInfo(`${data.name} has been created.`);
        } finally {
            setLoading(false);
        }
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
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "500px", minWidth: "600px", }}
            ><Card>
            <Card.Header><h2>Dodaj projekt</h2></Card.Header>
            <Card.Body>
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
                    Inwestor:
                    <input
                        className="InputForm"
                        type="text"
                        name="contact"
                        // value={form.name}
                        // onChange={e => updateForm('name', e.target.value)}
                    /><br/>
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
