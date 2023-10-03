export interface Question {
    uid: string;
    question: string;
    type: string;
    options?: string[];
    answer: string[] | string;
    tags: string[];
    marks: number;
 }