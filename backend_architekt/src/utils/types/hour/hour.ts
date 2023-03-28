import { EmployeeRes } from "../employee";
import { ProjectSimpleRes } from "../projekt";
import { KindOfWorkItemEntity } from "../kindOfWork";

export interface CreateHour {
    projectId: string;
    employeeId: string;
    kindofworkId: string;
    quantity: number;
    date: string;
    timeAd?: string;
}

export interface CreateHourRecord extends Omit<CreateHour, 'id'> {
    id?:string;
}

export interface HourItemEntity {
    id?: string;
    quantity: number;
}

export interface ListHourRes {
    place: number;
    hour: HourItemEntity;
}

export interface ListAllToAddHoursRes{
    employeeList:EmployeeRes[],
    projectList: ProjectSimpleRes[],
    kindofworkList:KindOfWorkItemEntity[],
}

