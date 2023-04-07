import {AuthContextProvider} from "../auth/AuthContext";
import {HeaderMenuLink} from "./HeaderMenuLink";
import {Route, Routes} from "react-router-dom";
import {HomeView} from "../../views/HomeView";
import ProtectedRoute from "../auth/ProtectedRoute";
import {Login} from "../../views/Login";
import {EmployeesView} from "../../views/EmployeesView";
import {AddEmployee} from "../../Employees/AddEmployee/AddEmployee";
import {ProjectsView} from "../../views/ProjectsView";
import {AddProject} from "../../Projects/AddAndEditProject/AddProject";
import {HoursView} from "../../views/HoursView";
import {AddHours} from "../../Hours/AddHours/AddHours";
import {NotFoundView} from "../../views/NotFoundView";
import React from "react";
import {SingleProjectView} from "../../Projects/SingleProjectView";
import {SingleEmployeeView} from "../../Employees/SingleEmployeeView";
import {EditProject} from "../../Projects/AddAndEditProject/EditProject";
import {EditEmployee} from "../../Employees/AddEmployee/EditEmployee";

export const HeaderRouter=() => (
    <div >
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
            <Route path="/employee/edit/:idOfEmployee"
                   element={
                       <ProtectedRoute accessBy="authenticated">
                           <EditEmployee />
                       </ProtectedRoute>
                   }
            ></Route>
            <Route path="/employee/:idOfEmployee"
                   element={
                       <ProtectedRoute accessBy="authenticated">
                           <SingleEmployeeView />
                       </ProtectedRoute>
                   }
            ></Route>

            <Route path="/projects"
                   element={
                <ProtectedRoute accessBy="authenticated">
                <ProjectsView/>
                </ProtectedRoute>
                    }
            ></Route>
            <Route path="/project/:idOfProject"
                   element={
                <ProtectedRoute accessBy="authenticated">
                <SingleProjectView/>
                </ProtectedRoute>
                    }
            ></Route>
            <Route path="/project/edit/:idOfProject"
                   element={
                <ProtectedRoute accessBy="authenticated">
                <EditProject/>
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
    )
