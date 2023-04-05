import { ListEmployeeRespon } from "../employee";

export interface ProjectItemEntity {
  id: string;
  name: string;
  description: string;
  contact: string;
  quantityHours: number;
}

export interface ProjectSimpleRes {
  id?: string;
  description: string;
  contact: string;
  name: string;
  startDate: string;
  endDate: string;
  quantityHours: number;
}

export interface CreateProject {
  name: string;
  description: string;
  contact: string;
  startDate: string;
  endDate: string;
  quantityHours: number;
}

export interface ListProjectRes {
  place: number;
  project: ProjectSimpleRes;
}

export type ListProjectResAll = ListProjectRes[];
export type ListProjectSimpleResAll = ProjectSimpleRes[];

