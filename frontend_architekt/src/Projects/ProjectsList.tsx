import {useEffect, useState} from "react";
import {Spinner} from "../components/common/spiner/spinner";
import {ProjectTable} from "./ProjectTable";
import {ListProjectResAll} from "../types";


export const ProjectsList = () => {
    // const [projects, setProjects] = useState<ListProjectRes[] | null>([]);
    const [projects, setProjects] = useState<ListProjectResAll[] | null>([]);
    const [access, setAccess] = useState<string>('admin');


    const refreshProject = async () => {
        setProjects(null)
        const res = await fetch(`http://127.0.0.1:3001/api/project/list`);
        const data = await res.json();

        setProjects(data);
        setAccess('admin');
    };

    useEffect(() => {
        refreshProject();
    }, []);


    if (projects === null) {
        return <Spinner/>;
    }

    return <ProjectTable access={access} projects={projects} onProjectsChange={refreshProject}/>
}