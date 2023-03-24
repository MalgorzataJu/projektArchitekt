

export type CreateEmployeeProfileParams = {
  firstName: string;
  lastName: string;
  hourly?: number;
};

export interface CreateEmpoyeeRecord extends Omit<EmployeeEntity, 'id'> {
  id?: string;
}

export interface RegisterEmployeeRespon {
  id: string;
  email: string;
}

export interface EmployeeRes {
  id?: string;
  name: string;
  surname: string;
}

export interface EmployeeEntity extends EmployeeRes {
  email: string;
  password: string;
  hourlyrate: number;
}

export interface ListEmployeeRes {
  place: number;
  employee: EmployeeRes;
}

export interface ListEmployeeResAll {
  place: number;
  employee: EmployeeEntity;
}
export type GetListOfEmployeeResponse = EmployeeRes[];