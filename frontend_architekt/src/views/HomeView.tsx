import {Button, Card} from "react-bootstrap";

export const HomeView = () => (
    <>
        <div
            className="d-flex justify-content-center"
            style={{ margin: "30px"}}
        >
        <Card className="text-center">
        <h1>RCP Architekt  </h1>
        <Card.Body>
            <Card.Title>Witam na stronie platformy.</Card.Title>
            <Card.Text>
                <p>Platforma służy do rejestracji czasu pracy praconików biura.</p>
                <p>Pozwala zarządzać zespołem.</p>
            </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
        </div>
      </>
);

