import {useEffect, useState} from "react";
import {ListEmployeeResAll} from 'types';
import {Spinner} from "../components/common/spiner/spinner";
import {EmployeeTable} from "./EmployeeTable";
import {AddEmployee} from "./AddEmployee/AddEmployee";
import jwtInterceptor from "../helpers/jwtInterceptor";


export const EmployeesList = () => {
    const [list, setList] = useState<ListEmployeeResAll[] | null>([]);

    const refreshEmployee = async () => {

        try {
            setList(null)
            jwtInterceptor
                .get("http://localhost:3001/employee",
                    {withCredentials: true}
                )
                .then((response) => {
                    setList(response.data);
                    console.log("w employeelist", list)
                });

        } finally {
            setList(null)
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
            {}
            <EmployeeTable list={list} onEmployeeChange={refreshEmployee}/>
            <AddEmployee onEmployeeChange={refreshEmployee}/>
        </div>
    )
}
