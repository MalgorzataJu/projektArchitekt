import React from 'react';
import './App.css';
import {Header} from "./components/Layout/Header";
import {Route, Routes} from "react-router-dom";
import {HomeView} from "./views/HomeView";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import {Login} from "./views/Login";
import {EmployeesView} from "./views/EmployeesView";
import {ProjectsView} from "./views/ProjectsView";
import {AddProject} from "./Projects/AddProject/AddProject";
import {AuthContextProvider} from "./components/shared/AuthContext";
import {HoursList} from "./Hours/HoursList";
import {HoursView} from "./views/HoursView";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <Header/>
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
                    <Route path="/projects"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   <ProjectsView />
                               </ProtectedRoute>
                           }
                    ></Route>
                    <Route path="/projects/add"
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
                    <Route path="/hours/add"
                           element={
                               <ProtectedRoute accessBy="authenticated">
                                   {/*<HomeView />*/}
                               </ProtectedRoute>
                           }
                    ></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
