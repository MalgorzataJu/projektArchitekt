import {Container, Navbar, Nav, Button, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../auth/AuthContext";

export const HeaderMenuLink = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar  expand="md" bg="dark" variant="dark">
                <Navbar.Brand  as={Link} to="/">ARCHITEKT</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {user && (
                        <Nav className="me-auto">
                        <Nav.Link as={Link} to="/employee">Pracownicy</Nav.Link>
                        <Nav.Link  as={Link} to="/hours">Godziny</Nav.Link>
                        <Nav.Link as={Link} to="/projects">Projekty</Nav.Link>
                            <NavDropdown title="Dodaj" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/add-hour">Godziny</NavDropdown.Item>
                                <NavDropdown.Item href="/add-project">Projekty</NavDropdown.Item>
                                <NavDropdown.Item href="/add-employee">Dodaj Pracownika</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/add-task">  Dodaj Zadanie </NavDropdown.Item>
                            </NavDropdown>
                        <NavDropdown title="Statystyki" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/dodaj">Godziny w projektach</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Gidziny pracowników </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    )}
                    <Nav className="ms-auto">
                        {user && <Nav.Link>{user?.email}</Nav.Link>}
                        {!user && (
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                    {user && (
                        <Button variant="outline-success" type="button" onClick={() => {logout()}}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
        </Navbar>

    );
}
