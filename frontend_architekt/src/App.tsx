import React from 'react';
import { Container } from "react-bootstrap";
import {Header} from "./components/Layout/Header";
import {Footer} from "./components/Layout/Footer";
import Background from "./components/Layout/tlo.jpg";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div style={{
            backgroundImage: `url(${Background})`,
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
                <Header/>
                <Footer/>
        </div>

    );
}

export default App;
