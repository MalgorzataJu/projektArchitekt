import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import { ProjectSimpleRes } from 'types';
import axios from "axios";
import {Button, Card, Form} from "react-bootstrap";

export const SingleProjectEdit = () => {
    const [project, setProject] = useState<ProjectSimpleRes | null>(null);
    const {idOfProject} = useParams();

    useEffect(() => {
        (async () => {

            const res =await axios.get(`http://localhost:3001/project/${idOfProject}`, {
                withCredentials: true,
            });
            setProject(await res.data);
            console.log(res.data)

        })();
    }, []);

    if (project === null) {
        return null;
    }

    return <>
        <div
            className="d-flex justify-content-center"
            style={{ minHeight: "600px", minWidth: "600px" }}
        >
            <Card>
                <Card.Header><h2>Project: {project.name}</h2></Card.Header>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project name:</Form.Label>
                        <Form.Control type="name" placeholder={project.name} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="name" placeholder={project.description} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Contact:</Form.Label>
                        <Form.Control type="name" placeholder={project.contact} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Przewidziana ilość godzin:</Form.Label>
                        <Form.Control type="number" placeholder={String(project.quantityHours)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Początek projektu:</Form.Label>
                        <Form.Control type="date" placeholder={new Date(project.startDate).toLocaleDateString('en-CA')} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Koniec projektu:</Form.Label>
                        <Form.Control type="date" placeholder={String(project.endDate)} />
                        <Form.Text className="text-muted">
                            Project was added in .
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Zakończony" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Edit
                    </Button>
                </Form>
            </Card>
        </div>
    </>;
};
