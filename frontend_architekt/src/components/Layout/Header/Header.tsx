import {Menu} from "../Menu/Menu";
import React from "react";
import './Header.css'
import {Authentication} from "../../Authentication/Authentication";

export const Header = () => (
<header className="App-header">
    <h1>ARCHITEKT</h1>
    <Authentication/>
    <Menu/>
</header>
)