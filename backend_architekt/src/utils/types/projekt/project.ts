
export type CreateProjectReq = Omit<ProjectEntity, 'id'>;

export interface ProjectSimpleRes {
    id?: string;
    name: string;
    startDate: string;
    endDate: string;
    quantityHours: string;
}

export interface ListProjectRes {
    place: number;
    project: ProjectSimpleRes;
}

export interface ListProjectResAll {
    place: number;
    project: ProjectEntity;
}

export interface ProjectEntity extends ProjectSimpleRes{
    contact:string;
    description: string;
}
