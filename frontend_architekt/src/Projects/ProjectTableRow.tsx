import { ProjectSimpleRes} from "types";

interface Props {
    project: ProjectSimpleRes;
    number: number;
    onProjectsChange: () => void;
}

export const ProjectTableRow = (props: Props) => {
    const deleteProject = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();

        if (!window.confirm(`Are you sure you want to remove ${props.project.name}?`)) {
            return;
        }

        const res = await fetch(`http://127.0.0.1:3001/project/${props.project.id}`, {
            method: 'DELETE',
        });

        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`);
            return;
        }

        props.onProjectsChange();
    };
    return (
        <tr>
            <th>{props.number}</th>
            <td>
                {props.project.name}
                {/*<Link to={`/gift/${props.gift.id}`}>*/}
                {/*</Link>*/}
            </td>
            <td>
                {props.project.description}
            </td>
            <td>
                {props.project.startDate}
            </td>
            <td>
                {props.project.endDate}
            </td>
            <td>
                {props.project.quantityHours}
            </td>
            <td>
                Ilośc godzin wypracowana
            </td>
            <td>
                {props.project.contact}
            </td>
            <td>
                <a href="#" onClick={deleteProject}>🗑️</a>
                {/*<a href="#" onClick={editProject}>Edytuj</a>*/}

            </td>
        </tr>
    );
};


