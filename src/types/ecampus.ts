export type Anchor = {
    id: string;
    path: string;
    label: string;
};

export type Division = {
    id: number;
    name: string;
    url: string;
    logo: string | null;
    address: string | null;
};

export type ApiResponse<T> = {
    paging: PaginationModel;
    data: T[];
};

export interface PaginationModel {
    pageNumber: number;
    pageCount: number;
}

export type Subdivision = {
    id: number;
    name: string;
};
