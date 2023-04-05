import {HoursList} from "../Hours/HoursList";
import Card from "react-bootstrap/Card";

export const HoursView = () => {

    return <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "500px", minWidth: "600px" }}
            >
                <Card>
                    <Card.Header>Lista Godzin</Card.Header>
                    <HoursList/>
                </Card>
            </div>
    </>
}
