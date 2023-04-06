import React, {FormEvent, useEffect, useState} from 'react';
import {CreateHourRecord, ListAllToAddHoursRes} from 'types';
import {Spinner} from "../../components/common/spiner/spinner";
import {Card} from "react-bootstrap";
import axios from "axios";
import {HoursView} from "../../views/HoursView";

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

        try {
            await axios.get("http://localhost:3001/hour/add",
                {withCredentials: true}
                    )
                .then((response) => {

                    setData(response.data)
                    console.log("RESPONSE DATA",response.data)
                    console.log('projekt lisr', response.data.projectList[0].id);
                    console.log('FORM', form);
                    setForm({
                        projectId: response.data.projectList[0].id,
                        employeeId: response.data.employeeList[0].id,
                        kindofworkId: response.data.kindofworkList[0].id,
                        quantity: 1,
                        date:  new Date().toLocaleDateString('en-CA'),
                    })

                });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshHours();
    }, []);


    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        console.log(form)

        try {
            await axios.post("http://localhost:3001/hour", form,
                {withCredentials: true}
            )
                .then((response) => {
                    console.log('response ', response.data)
                    setResultInfo(`${response.data} has been created.`);
                });


        } finally {
            setLoading(false);
        }
        // props.onEmployeeChange();
    };

    if (loading) {
        return <Spinner/>;
    }

    if (resultInfo !== null) {
        return <HoursView/>
    }

    return <>
            <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "500px", minWidth: "800px", }}
            ><Card>
            <Card.Header><h2>Dodaj Godziny pracy</h2></Card.Header>
            <Card.Body>
            <form onSubmit={sendForm}>
            <div className='LabelForm'>
                Pracownik:
                <select
                    className="InputForm"
                    value={form.employeeId}
                    onChange={e => updateForm('employeeId', e.target.value)}
                >
                    {
                        data.employeeList.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))
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
                        data.projectList.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))
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
                        data.kindofworkList.map(k => (
                            <option key={k.id} value={k.id}>
                                {k.hourstype}
                            </option>
                        ))
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
      </Card.Body>
    </Card>
  </div>
 </>
};
