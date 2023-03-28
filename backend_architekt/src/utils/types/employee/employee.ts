export type CreateEmployeeProfileParams = {
  name: string;
  lastname: string;
  hourly?: number;
};
export type RegisterEmployeeRes = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirm: string;
  hourly: number;
}

export interface EmployeeRes {
  id?: string;
  name: string;
  lastname: string;
}
export type ProfileEntityRes = {
  id?: string;
  name: string;
  lastname: string;
  hourly?: number;
}

export interface EmployeeEntity extends EmployeeRes {
  email: string;
  password: string;
  authStrategy: string;
  profile: ProfileEntityRes;
}

export type RegisterEmployeeRespon = {
  id: string;
  name: string;
  lastname: string;
  hourly: number;
};
///

export type CreateEmployeeParams = {
  password: string;
  email: string;
};

export type UpdateEmployeeParams = {
  password: string;
  email: string;
};

export interface CreateEmpoyeeRecord extends Omit<EmployeeEntity, 'id'> {
  id?: string;
}
export interface RegisterUserRespon {
  id: string;
  email: string;
}

export interface ListEmployeeRes {
  place: number;
  employee: EmployeeEntity;
}

export interface ListEmployeeResAll {
  place: number;
  employee: EmployeeEntity;
}