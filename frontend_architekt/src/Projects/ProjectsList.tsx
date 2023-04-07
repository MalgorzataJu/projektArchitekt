import {useEffect, useState} from "react";
import { ListProjectSimpleResAll } from "types";
import {Spinner} from "../components/common/spiner/spinner";
import {ProjectTable} from "./ProjectTable";
import axios from "axios";
import {Login} from "../views/Login";


export const ProjectsList = () => {
    const [projects, setProjects] = useState<ListProjectSimpleResAll | null>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const refreshProject = async () => {

        try {
            setProjects(null);
            await axios.get("http://127.0.0.1:3001/project",
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
            // setIsLogin(false)
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
