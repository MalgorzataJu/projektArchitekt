import React from "react";
import './Authentication.css';
import {Link} from "react-router-dom";

export const Authentication = () => {

    return (
        <>
        <div className="authentication-wrapper">
            <Link to="/login">Logowanie</Link>
            <Link to="/registration">Rejestracja</Link>
        </div>
        </>
)
}
