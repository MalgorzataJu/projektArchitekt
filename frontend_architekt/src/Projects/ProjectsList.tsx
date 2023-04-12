import {useEffect, useState} from "react";
import { ListProjectSimpleResAll } from "types";
import {Spinner} from "../components/common/spiner/spinner";
import {ProjectTable} from "./ProjectTable";
import axios from "axios";
import {Login} from "../views/Login";
import {apiUrl} from "../config/api";


export const ProjectsList = () => {
    const [projects, setProjects] = useState<ListProjectSimpleResAll | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshProject = async () => {

        try {

            setProjects(null);

            await axios.get(`${apiUrl}/project`,
                {withCredentials: true}
            )
                .then((response) => {
                    setProjects(response.data);
                    setIsLogin(true);
                })
                .catch(error => {
                    console.log(error.response);
                    return error.response;
                });
        }finally {

        }}

    useEffect(() => {
        refreshProject();
    }, []);

    if (!isLogin) return <Login/>
    
    if (projects === null) {
        return <Spinner/>;
    }
    return <ProjectTable projects={projects} onProjectsChange={refreshProject}/>
}
