export interface ProjectItemEntity {
  id: string;
  name: string;
  description: string;
  contact: string;
  quantityHours: number;
}

export interface ProjectSimpleRes {
  id?: string;
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
  project: ProjectItemEntity;
}

export type ListProjectResAll = ListProjectRes[];
export type ListProjectSimpleResAll = ProjectSimpleRes[];
