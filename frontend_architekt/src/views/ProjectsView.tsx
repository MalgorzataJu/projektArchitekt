import {ProjectsList} from "../Projects/ProjectsList";
import {Card} from "react-bootstrap";

export const ProjectsView = () => (
    <>
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "500px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header>Lista Projektów w realizacji</Card.Header>
                <ProjectsList/>
            </Card>
        </div>
    </>
)
