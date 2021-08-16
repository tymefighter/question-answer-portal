import Answer, { isAnswers } from "./Answer";

interface Student {
  username: string;
  attempted: boolean;
  ans: Answer[],
  evaluated: boolean;
  marks: number;
};

export const isStudent = (student: any): student is Student => {
  return (
    typeof student === 'object'
    && typeof student.username === 'string'
    && typeof student.attempted === 'boolean'
    && typeof student.evaluated === 'boolean'
    && typeof student.marks === 'number'
    && isAnswers(student.ans)
  );
};

export default Student;