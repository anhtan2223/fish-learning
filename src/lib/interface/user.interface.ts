export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
}


export interface Student extends User {
    student_code: string;
    role: 'student';
}

export interface Teacher extends User {
  role: 'teacher';
}