import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomeView} from "./views/HomeView";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {Login} from "./views/Login";
import {EmployeesView} from "./views/EmployeesView";
import {ProjectsView} from "./views/ProjectsView";
import {AddProject} from "./Projects/AddProject/AddProject";
import {AuthContextProvider} from "./components/auth/AuthContext";
import {HoursView} from "./views/HoursView";
import {AddEmployee} from "./Employees/AddEmployee/AddEmployee";
import {NotFoundView} from "./views/NotFoundView";
import {HeaderMenuLink} from "./components/Layout/HeaderMenuLink";
import {AddHours} from "./Hours/AddHours/AddHours";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <HeaderMenuLink/>
                <Routes>
                    <Route path="/" element={<HomeView />}></Route>
                    <Route path="/login"
                           element={
                               <ProtectedRoute accessBy="non-authenticated">
                                   <Login />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/employee"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <EmployeesView />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/add-employee"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <AddEmployee />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/projects"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <ProjectsView />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/add-project"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <AddProject />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/hours"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <HoursView />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/add-hour"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <AddHours/>
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="*" element={<NotFoundView/>} />
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
