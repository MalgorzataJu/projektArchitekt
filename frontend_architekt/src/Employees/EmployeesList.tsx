import {useEffect, useState} from "react";
import {ListEmployeeResAll} from 'types';
import {Spinner} from "../components/common/spiner/spinner";
import {EmployeeTable} from "./EmployeeTable";
import axios from "axios";


export const EmployeesList = () => {
    const [list, setList] = useState<ListEmployeeResAll[] | null>([]);

    const refreshEmployee = async () => {

        try {
                setList(null)

                await axios.get("http://localhost:3001/employee",
                    {withCredentials: true}
                )
                .then((response) => {
                    setList(response.data);
                });

        } finally {

        }
    };

    useEffect(() => {
        refreshEmployee();
    }, []);


    if (list === null) {
        return <Spinner/>;
    }

    return (
        <div>
            <EmployeeTable list={list} onEmployeeChange={refreshEmployee}/>
        </div>
    )
}
