import {useEffect, useState} from "react";
import { ListProjectSimpleResAll } from "types";
import {Spinner} from "../components/common/spiner/spinner";
import {ProjectTable} from "./ProjectTable";


export const ProjectsList = () => {
    const [projects, setProjects] = useState<ListProjectSimpleResAll | null>([]);

    const refreshProject = async () => {
        setProjects(null)
        const res = await fetch(`http://127.0.0.1:3001/project`);
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
