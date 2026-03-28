import { EmploymentType } from "@/types/intellect";

export const LABEL_COLORS = {
    [EmploymentType.Unknown]: {
        backgroundColor: 'bg-gray-600',
        textColor: 'text-gray-600'
    },
    [EmploymentType.FullTime]: {
        backgroundColor: 'bg-brand-600',
        textColor: 'text-brand-600'
    },
    [EmploymentType.PartTime]: {
        backgroundColor: 'bg-[#52A076]',
        textColor: 'text-[#52A076]'
    },
    [EmploymentType.PartTimeInternal]: {
        backgroundColor: 'bg-[#52A076]',
        textColor: 'text-[#52A076]'
    },
    [EmploymentType.PartTimeExternal]: {
        backgroundColor: 'bg-[#52A076]',
        textColor: 'text-[#52A076]'
    },
    [EmploymentType.HourlyPay]: {
        backgroundColor: 'bg-[#C75E72]',
        textColor: 'text-[#C75E72]'
    }
}

export const EMPLOYMENT_TYPE: Record<EmploymentType, string> = {
    [EmploymentType.Unknown]: 'Інформації немає',
    [EmploymentType.FullTime]: 'PRIMARY APPOINTMENT (PA)',
    [EmploymentType.PartTime]: 'SECONDARY APPOINTMENT (SA)',
    [EmploymentType.PartTimeInternal]: 'SECONDARY APPOINTMENT (SA)',
    [EmploymentType.PartTimeExternal]: 'SECONDARY APPOINTMENT (SA)',
    [EmploymentType.HourlyPay]: 'HOURLY APPOINTMENT (HA)'
};