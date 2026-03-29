export type Division = {
    id: number;
    name: string;
    url: string;
    abbreviation: string;
    bravoId: number;
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
