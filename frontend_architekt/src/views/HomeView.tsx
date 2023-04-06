import {Card} from "react-bootstrap";

export const HomeView = () => (
    <>
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "500px", minWidth: "600px" }}
        >
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <h1>Witam na stronie platformy Architekt.</h1>

                            <p>Platforma służy do rejestracji czasu pracy praconików.</p>
                            <p>Pozwala zarządzać projektwami.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
        </div>
        </>
)
