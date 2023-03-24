export type CreateUserParams = {
    password: string;
    email: string;
}

export type UpdateUserParams = {
    password: string;
    email: string;
}

export type CreateUserProfileParams = {
    firstName: string;
    lastName: string;
    hourly?: number;
}


export interface CreateEmpoyeeRecord extends Omit<EmployeeEntity, 'id'> {
    id?:string;
}

export interface RegisterUserRespon {
    id: string;
    email: string;
}

export interface EmployeeRes {
    id?: string;
    name: string;
    surname: string;
}

export interface EmployeeEntity extends EmployeeRes{
    email:string;
    password:string;
    hourlyrate:number;
}

export interface ListEmployeeRes {
    place:number,
    employee:EmployeeRes,
}

export interface ListEmployeeResAll {
    place:number,
    employee:EmployeeEntity,
}
