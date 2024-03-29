import React from 'react';
import {Footer} from "./components/Layout/Footer";
import {HeaderRouter} from "./components/Layout/HeaderRouter";
import Background from "./components/Layout/tlo.jpg";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <>
        <div className="App-div" style={{
            backgroundImage: `url(${Background})`,
            height:'95vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
        <HeaderRouter/>
        </div>
        <Footer/>
    </>

    );
}

export default App;
