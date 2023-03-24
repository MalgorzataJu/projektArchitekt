
import {ProjectTableRow} from "./ProjectTableRow";
import {ListProjectResAll} from "../types";

interface Props {
    projects: ListProjectResAll[];
    access: string;
    onProjectsChange: () => void;
}

export const ProjectTable = (props: Props) => {


    return (
        <table>
            <thead>
            <tr>
                <th>lp.</th>
                <th>Nazwa Projektu</th>
                <th>Opis</th>
                <th>Data rozpoczęcia</th>
                <th>Data zakończenia</th>
                <th>Planowana ilość godzin</th>
                <th>Wypracownana ilość godzin</th>
                <th>Kontakt</th>
                <th>Edytuj</th>
            </tr>
            </thead>
            <tbody>
            {
                props.projects.map(el => (
                    <ProjectTableRow
                        key={el.project.id}
                        number={el.place}
                        project={el.project}
                        onProjectsChange={props.onProjectsChange}
                    />
                ))
            }
            </tbody>
        </table>
    )
}