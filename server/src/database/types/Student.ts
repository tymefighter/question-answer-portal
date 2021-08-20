import Answer, { isAnswers } from "./Answer";
import Status, { isStatus } from "./Status";

interface Student {
  username: string;
  status: Status;
  ans: Answer[],
  marks: number;
};

export const isStudent = (student: any): student is Student => {
  return (
    typeof student === 'object'
    && typeof student.username === 'string'
    && typeof student.marks === 'number'
    && isStatus(student.status)
    && isAnswers(student.ans)
  );
};

export default Student;