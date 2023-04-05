import {HoursItemRes} from "types";

interface Props {
    hour: HoursItemRes;
    number: number;
    onHoursChange: () => void;
}

export const HoursTableRow = (props: Props) => {
    const deleteHour = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.hour.employeeId}?`)) {
            return;
        }

        const res = await fetch(`http://127.0.0.1:3001/project/${props.hour.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
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


