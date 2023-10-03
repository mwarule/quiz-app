export interface User {
    uid: string;
    email: string;
    name: string;
    emailVerified?: boolean;
    education?: Education;
 }

 export interface Education {
    board: string;
    standard: string;
    favSubjects: any;
    medium: string;
 }