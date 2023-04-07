import {HoursItemRes} from "types";
import axios from "axios";

interface Props {
    hour: HoursItemRes;
    number: number;
    onHoursChange: () => void;
}

export const HoursTableRow = (props: Props) => {
    const deleteHour = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove hour:
         ${props.hour.projectId}  ${props.hour.employeeId} with date: ${props.hour.date}?`)) {
            return;
        }

        const res = await axios.delete(`http://127.0.0.1:3001/hour/${props.hour.id}`, {
            withCredentials: true,
        });

        console.log(res);

        if ([400, 500].includes(res.status)) {
            alert(`Error occurred: ${res.statusText}`);
            return;
        }

        props.onHoursChange();
    };

    return (
        <tr>
            <th>{props.number}</th>
            <td>
                {props.hour.projectId}
            </td>
            <td>
                {props.hour.employeeId}
            </td>
            <td>
                {props.hour.kindofworkId}
            </td>
            <td>
                {props.hour.quantity}
            </td>
            <td>
                {props.hour.date}
            </td>
            <td>
                <a href="#" onClick={deleteHour}>🗑️</a>
                {/*<a href="#" onClick={onHoursChange}>Edytuj</a>*/}

            </td>
        </tr>
    );
};


