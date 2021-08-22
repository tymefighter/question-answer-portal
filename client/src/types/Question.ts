interface Question {
  id: string;
  question: string;
};

export const isQuestion = (question: any): question is Question => {
  return (
    typeof question === 'object'
    && typeof question.id === 'string'
    && typeof question.question === 'string'
  );
}

export const isQuestions = (questions: any): questions is Question[] => {
  if(!(questions instanceof Array)) return false;

  for(const question of questions)
    if(!isQuestion(question)) 
      return false;
  
  return true;
};

export default Question;