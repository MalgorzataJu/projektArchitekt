import { ListEmployeeResAll } from "types";
import {EmployeeTableRow} from "./EmployeeTableRow";

interface Props {
    list: ListEmployeeResAll[],
    onEmployeeChange: () => void;
}

export const EmployeeTable =(props: Props) => {
    console.log(props);
    return (
            <table className="UsersList">
                <thead>
                <tr>
                    <th>lp.</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>email</th>
                    <th>Stawka godzinowa</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.list.map(el =>(
                        <EmployeeTableRow
                            key={el.employee.id}
                            employee={el.employee}
                            place={el.place}
                            onEmployeeChange={props.onEmployeeChange}
                        />
                    ))
                }
                </tbody>
            </table>
    )
}
