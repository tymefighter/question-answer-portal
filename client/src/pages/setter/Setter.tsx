// Components
import Question from 'modules/question';
import QuestionForm from './components/QuestionForm';
import Loading from 'modules/loading';
import Navbar from 'modules/navbar';

// Hooks
import useQuestions from 'modules/request/hooks/useQuestions';

// Styles
import styles from './Setter.module.scss';

export default function Setter() {

  const { questions, errorMessage } = useQuestions();

  if(errorMessage)
    throw new Error(errorMessage);

  if(questions === undefined)
    return <Loading />;

  return (
    <>
      <Navbar
        rightLinks={[{
          label: 'Logout',
          link: '/logout'
        }]}
      />
      <div className={styles.container}>
        <h1>Questions</h1>
        {questions.map(question => (
          <Question key={question.id} question={question.question} />
        ))}
        <QuestionForm />
      </div>
    </>
  );
}