import React from "react";
// import './Header.css'
import {AuthContextProvider} from "../../shared/AuthContext";
import Layout from "../Layout";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../../shared/ProtectedRoute";
import {HomeView} from "../../../views/HomeView";
import {EmployeesView} from "../../../views/EmployeesView";
import {ProjectsView} from "../../../views/ProjectsView";
import {AddProject} from "../../../Projects/AddProject/AddProject";
import {Login} from "../../../views/Login";

export const Header = () => (
<>
    <AuthContextProvider>
        <Layout>
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
                            <HomeView />
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
        </Layout>
    </AuthContextProvider>
</>
)
