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

export interface ListProjectRes {
  place: number;
  project: ProjectSimpleRes;
}



export type ListProjectResAll = ProjectItemEntity[];


