// Styles
import styles from './FilledAnswer.module.scss';

interface FilledAnswerProps {
  answer: string;
};

export default function FilledAnswer({ answer }: FilledAnswerProps) {
  return (
    <div className={styles.answer}>
      <span>A.</span>
      <p>{answer}</p>
    </div>
  )
}