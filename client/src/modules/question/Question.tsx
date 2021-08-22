// Styles
import styles from './Question.module.scss';

interface QuestionProps {
  question: string;
};

export default function Question({ question }: QuestionProps) {
  return (
    <div className={styles.question}>
      <span>Q.</span>
      <p>{question}</p>
    </div>
  )
}