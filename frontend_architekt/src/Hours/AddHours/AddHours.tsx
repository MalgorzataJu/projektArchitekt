import React, {FormEvent, useEffect, useState} from 'react';
import {Spinner} from "../../components/common/spiner/spinner";
import {CreateHourRecord, ListAllToAddHoursRes} from "../../types";

interface Props {
    // onEmployeeChange: () => void;
}

export const AddHours = (props: Props) => {
    const [data, setData] = useState<ListAllToAddHoursRes >({
        employeeList: [],
        kindofworkList: [],
        projectList: [],
    })
    const [form, setForm] = useState<CreateHourRecord>({
        projectId: '',
        employeeId: '',
        kindofworkId: '',
        quantity: 1,
        date: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const refreshHours = async () => {

        const res = await fetch(`http://127.0.0.1:3001/api/hour/add`);
        const data = await res.json();

        setData(data);
        setForm({
            projectId: form.projectId?? data.projectList[0].projectId,
            employeeId: form.projectId ?? data.employeeList[0].employeeId,
            kindofworkId: form.kindofworkId ?? data.kindofworkList[0].kindofworkId,
            quantity: Number(form.kindofworkId),
            date: new data(),
        })
    };

    useEffect(() => {
        refreshHours();
    }, []);


    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        console.log(form)

        try {
            const res = await fetch(`http://localhost:3001/api/hour`, {
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
        // props.onEmployeeChange();
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
        <h2>Dodaj Godziny pracy:</h2>
        <form onSubmit={sendForm} className="AddEmployee">
            <div className='LabelForm'>
                Pracownik:
                <select
                    className="InputForm"
                    value={form.employeeId}
                    onChange={e => updateForm('employeeId', e.target.value)}
                >
                    {
                        // data.employeeList.map(employee => (
                        //     <option key={employee.id} value={employee.id}>
                        //         {employee.name} {employee.surname}
                        //     </option>
                        // ))
                    }
                </select>
            </div>
            <div className='LabelForm'>
                Project:
                <select
                    className="InputForm"
                    value={form.projectId}
                    onChange={e => updateForm('projectId', e.target.value)}
                >
                    {
                        // data.projectList.map(project => (
                        //     <option key={project.id} value={project.id}>
                        //         {project.name}
                        //     </option>
                        // ))
                    }
                </select>
            </div>
            <div className='LabelForm'>
                Rodzaj:
                <select
                    className="InputForm"
                    value={form.kindofworkId}
                    onChange={e => updateForm('kindofworkId', e.target.value)}
                >
                    {
                        // data.kindofworkList.map(k => (
                        //     <option key={k.id} value={k.id}>
                        //         {k.hourstype}
                        //     </option>
                        // ))
                    }
                </select>
            </div>
            <div className='LabelForm'>
                <label>
                    Data wykonania:
                    <input
                        className="InputForm"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={e => updateForm('date', e.target.value)}

                    />
                </label>
            </div>
            <div className='LabelForm'>
                <label>
                    Ilość godzin:
                    <input
                        className="InputForm"
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={e => updateForm('quantity', e.target.value)}
                    /><br/>
                </label>
            </div>

            <button className="ButtonForm" type="submit">Dodaj</button>
        </form>
    </>
};