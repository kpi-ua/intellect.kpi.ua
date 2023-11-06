declare module "*.svg"
declare module "*.png"

declare module ECampus {
    type Anchor = {
        id: string,
        path: string,
        label: string,
    }

    type Division = {
        Id: number,
        Name: string,
        Url: string,
        Logo: string | null,
        Address: string | null
    }

    type ApiResponse<T> = {
        Paging: object,
        Data: T[]
    }
}

declare module Intellect {
    type Teacher = {
        Profile: string,
        Credo: string,
        Photo: string,
        FullName: string,
        UserIdentifier: string,
        Id: number,
        IsConfirmed: boolean,
        ContactRecord: string[] | null,
        AcademicStatus: string,
        AcademicDegree: string,
        ScientificInterests: string,
        Items: any[],
        Status: string,
        Field: any,
        Positions: Position[]
    }

    type Position = {
        Name: string,
        Subdivision: ECampus.Division,
    }

    type ExperienceItem = {
        Key: string,
        Value: {
            [key: string]: {
                [key in string]: string[]
            }
        }
    }

    type ExperienceType =  'publications' | 'exploration' | 'exploration_results' | 'confs';

    type TeacherExperience = {
        [key in ExperienceType]: ExperienceItem[]
    }
}
