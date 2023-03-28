export type CreateEmployeeProfileParams = {
  name: string;
  lastname: string;
  hourly?: number;
};

export type RegisterEmployeeRespon = {
  id:string;
  name: string;
  lastname: string;
  hourly: number;
};
