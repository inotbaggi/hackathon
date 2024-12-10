// types.ts

export interface Authorized {
    id: number;
    token: string;
    role: string | null;
}

export interface UserDTO {
    id: number;
    email: string;
    fio: string;
    role: Role;
    verified: boolean;
    verificationCanceled: boolean;
    studentProfile: StudentProfileDTO | null;
    teacherProfile: TeacherProfileDTO | null;
    employerProfile: EmployerProfileDTO | null;
}

export interface StudentProfileDTO {
    educationalInstitution: string;
    group: string;
}

export interface TeacherProfileDTO {
    educationalInstitution: string;
    subject: string;
}

export interface EmployerProfileDTO {
    companyName: string;
    position: string;
}

export enum Role {
    USER = 'USER',
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    EMPLOYER = 'EMPLOYER',
    ADMINISTRATOR = 'ADMINISTRATOR',
}