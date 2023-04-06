import React from 'react';
import {Card} from "react-bootstrap";


export const NotFoundView = () => (
    <>
    <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px", minWidth: "600px" }}
    >
        <Card>
            <Card.Header><h2>You are lost :(</h2></Card.Header>
            <p>Where are we?!</p>
        </Card>
    </div>
    </>
)
