export interface Course {
    [x: string]: any;
    id?: string;
    title: string;
    description: string;
    creationDate?: string;
    duration: number;
    authors: string[];
  }