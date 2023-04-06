import React, {SyntheticEvent, useContext, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AuthContext from "../components/auth/AuthContext";

export const Login = () => {
  const [loginPar, setLoginPer] = useState({
    email:'',
    password:'',
  });

  const { login } = useContext(AuthContext);

  const loginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await login(loginPar);
  };

  const changeForm = (key: string, value: any) => {
    setLoginPer(loginPar => ({
      ...loginPar,
      [key]:value,
    }));
  }

  return <>
        <Container className="mt-2">
        <Row>
            <Col className="col-md-8 offset-md-2">
                <legend>Login Form</legend>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email
                    <Form.Control
                  type="text"
                  value={loginPar.email}
                  name='email'
                  onChange={e =>changeForm("email", e.target.value)}
              />
              </Form.Label>
                </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswor">
              <Form.Label>Password:
                  <Form.Control
                      type="password"
                    value={loginPar.password}
                    name='password'
                    onChange={e =>changeForm("password", e.target.value)}
                />
              </Form.Label>
            </Form.Group>
            <Button variant="primary" type="button" onClick={loginSubmit}/>
              Login
            </Col>
        </Row>
    </Container>
    </>
};

