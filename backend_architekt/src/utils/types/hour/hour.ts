

export interface CreateHourRecord extends Omit<HourEntity, 'id'> {
    id?:string;
}

export interface HourEntity {
    id?: string;
    projectId: string;
    employeeId: string;
    kindofworkId: string;
    quantity: number;
    date: string;
    timeAd?: string;
}

export interface ListHourRes {
    place: number;
    hour: HourEntity;
}

export interface ListAllToAddHoursRes{
    // employeeList:EmployeeRes[],
    // projectList: ProjectSimpleRes[],
    // kindofworkList:KindOfWorkRecord[],
}

