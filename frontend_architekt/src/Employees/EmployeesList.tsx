import {useEffect, useState} from "react";
import {ListEmployeeResAll} from 'types';
import {Spinner} from "../components/common/spiner/spinner";
import {EmployeeTable} from "./EmployeeTable";
import {AddEmployee} from "./AddEmployee/AddEmployee";


export const EmployeesList = () => {
    const [list, setList] = useState<ListEmployeeResAll[] | null>([]);

    const refreshEmployee = async () => {
        setList(null)
        const res = await fetch(`http://127.0.0.1:3001/employee`);
        const data = await res.json();
        console.log(data);
        setList(data);
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
            {/*<AddEmployee onEmployeeChange={refreshEmployee}/>*/}
        </div>
    )
}
