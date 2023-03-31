import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Header} from "./components/Layout/Header/Header";
import {Footer} from "./components/Layout/Footer/Footer";
import {Registration} from "./components/Authentication/Registration";
import {Login} from "./components/Authentication/Login";
import {HomeView} from "./views/HomeView";
import {ProjectsView} from "./views/ProjectsView";
import './App.css';
import {EmployeesView} from "./views/EmployeesView";
import {AddProject} from "./Projects/AddProject/AddProject";
import {HoursView} from "./views/HoursView";



function App() {
    return (
        <div className="App">
           <Header/>
            <div className="Content">
            <Routes>
                <Route path="/" element={<HomeView/>}/>
                <Route path="/employee" element={<EmployeesView/>}/>
                <Route path="/projects" element={<ProjectsView/>}/>
                <Route path="/projects/add" element={<AddProject/>}/>
                <Route path="/hours" element={<HoursView/>}/>
                {/*<Route path="/hours/add" element={<HoursView/>}/>*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
