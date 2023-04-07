import {useEffect, useState} from "react";
import {ListEmployeeResAll} from 'types';
import {Spinner} from "../components/common/spiner/spinner";
import {EmployeeTable} from "./EmployeeTable";
import axios from "axios";
import {Login} from "../views/Login";


export const EmployeesList = () => {

    const [list, setList] = useState<ListEmployeeResAll[] | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshEmployee = async () => {

        try {
                setList(null)

                await axios.get("http://localhost:3001/employee",
                    {withCredentials: true}
                )
                .then((response) => {
                    setList(response.data);
                    setIsLogin(true);
                })
                .catch(error => {
                    console.log(error.response);

                    return error.response;
                }) ;

        } finally {

        }
    };

    useEffect(() => {
        refreshEmployee();
    }, []);

    if (!isLogin) return <Login/>

    if (list === null) {
        return <Spinner/>;
    }

    return (
        <div>
            <EmployeeTable list={list} onEmployeeChange={refreshEmployee}/>
        </div>
    )
}
