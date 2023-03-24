import {Link} from "react-router-dom";
import './Menu.css';
import React from "react";

export const Menu = () => (
    <>
        <div className="Menu">
            <Link to="/employee">Lista pracowników</Link>
            <Link to="/projects">Lista projektów</Link>
            <Link to="/projects/add">Dodaj projekt</Link>
            <Link to="/hours">Godziny pracy</Link>
            <Link to="/">Statystyki</Link>
        </div>
    </>
)