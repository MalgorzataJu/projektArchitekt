import {useEffect, useState} from "react";
import {ListProjectResAll} from 'types';
import {Spinner} from "../components/common/spiner/spinner";
import {ProjectTable} from "./ProjectTable";


export const ProjectsList = () => {
    // const [projects, setProjects] = useState<ListProjectRes[] | null>([]);
    const [projects, setProjects] = useState<ListProjectResAll | null>([]);

    const refreshProject = async () => {
        setProjects(null)
        const res = await fetch(`http://127.0.0.1:3001/api/project/list`);
        const data = await res.json();

        setProjects(data);
    };

    useEffect(() => {
        refreshProject();
    }, []);


    if (projects === null) {
        return <Spinner/>;
    }

    return <ProjectTable projects={projects} onProjectsChange={refreshProject}/>
}
