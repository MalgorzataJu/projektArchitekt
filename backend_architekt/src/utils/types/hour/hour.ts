

export interface CreateHourRecord extends Omit<HourItemEntity, 'id'> {
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
    // employeeList:EmployeeRes[],
    // projectList: ProjectSimpleRes[],
    // kindofworkList:KindOfWorkRecord[],
}

