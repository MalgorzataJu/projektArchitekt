import React from "react";
import { EmployeeEntity } from "types";

interface Props {
    key: string | undefined,
    place:number,
    employee:EmployeeEntity,
    onEmployeeChange: () => void;
}

export const EmployeeTableRow = (props : Props) => {

    const deleteEmployee = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.employee.name}?`)) {
            return;
        }

        const res = await fetch(`http://127.0.0.1:3001/employee/${props.employee.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        props.onEmployeeChange();
    };
    return(
        <tr  className="UserListOneItem">
            <th>{props.place}</th>
            <td>
                {props.employee.profile.name}
                {/*<Link to={`/gift/${props.gift.id}`}>*/}
                {/*</Link>*/}
            </td>
            <td>
                {props.employee.profile.lastname}
            </td>
            <td>
                {props.employee.email}
            </td>
            <td>
                {props.employee.profile.hourly}
            </td>
            <td>
                <a href="#" onClick={deleteEmployee}>🗑️</a>
            </td>

        </tr>
    )
};
