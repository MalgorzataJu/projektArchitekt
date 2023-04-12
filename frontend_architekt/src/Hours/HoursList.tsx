import {useEffect, useState} from "react";
import {Spinner} from "../components/common/spiner/spinner";
import jwtInterceptor from "../helpers/jwtInterceptor";
import {AddEmployee} from "../Employees/AddEmployee/AddEmployee";
import {HoursTable} from "./HoursTable";
import { ListHourResAll } from "types";
import {apiUrl} from "../config/api";

export const HoursList = () => {
    const [hoursList, setHoursList] = useState<ListHourResAll[] | null>([]);

    const refreshHoursList = async () => {

    try {
        setHoursList(null)
        jwtInterceptor
            .get(`${apiUrl}/hour`,
                {withCredentials: true}
            )
            .then((response) => {
                setHoursList(response.data);
            });

        } finally {
        setHoursList(null)
        }
    };

    useEffect(() => {
        refreshHoursList();
    }, []);


if (hoursList === null) {
        return <Spinner/>;
    }

    return  <>
        <div>
            <HoursTable hours={hoursList} onHoursChange={refreshHoursList}/>
            {/*<AddEmployee onHoursChange={refreshHoursList}/>*/}
        </div>
        {/*<AddHours/>*/}
    </>

}

