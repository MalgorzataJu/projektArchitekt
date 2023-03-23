export interface CreateKindOfWork extends Omit<KindOfWorkEntity, 'id'> {
    id?:string;
}

export interface KindOfWorkEntity {
    id?: string;
    hourstype:string;
}

export interface ListKindOfWorkRes {
    place: number;
    hour:KindOfWorkEntity;
}