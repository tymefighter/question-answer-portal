import Answer from "./Answer";

interface Student {
  username: string;
  attempted: boolean;
  ans: Answer[],
  evaluated: boolean;
  marks: number;
};

export default Student;