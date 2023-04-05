import {EmployeesList} from "../Employees/EmployeesList";
import Card from "react-bootstrap/Card";

export const EmployeesView = () => (
    <>
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "500px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header>Lista Pracowników</Card.Header>
                <EmployeesList/>
            </Card>
        </div>
    </>
)
