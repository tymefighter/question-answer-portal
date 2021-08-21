interface Answer {
  questionId: string;
  answer: string;
};

export const isAnswer = (answer: any): answer is Answer => {
  return (
    typeof answer === 'object'
    && typeof answer.questionId === 'string'
    && typeof answer.answer === 'string'
  );
}

export const isAnswers = (answers: any): answers is Answer[] => {
  if(!(answers instanceof Array)) return false;

  for(const answer of answers)
    if(!isAnswer(answer)) 
      return false;
  
  return true;
};

export default Answer;