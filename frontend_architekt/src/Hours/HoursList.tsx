import {useEffect, useState} from "react";
import {ListHourRes} from 'types';
import {Spinner} from "../components/common/spiner/spinner";
import {AddHours} from "./AddHours/AddHours";

export const HoursList = () => {
    const [hours, setHours] = useState<ListHourRes[] | null>([]);

    const refreshHours = async () => {
        setHours(null)
        const res = await fetch(`http://127.0.0.1:3001/hour`);
        const data = await res.json();

        setHours(data);
    };

    useEffect(() => {
        refreshHours();
    }, []);


    if (hours === null) {
        return <Spinner/>;
    }

    return  <>
        <h1>Będzie lista</h1>
        <AddHours/>
    </>

}
