// Styles
import styles from './Answer.module.scss';

interface AnswerProps {
  inputId: string;
};

export default function Answer({ inputId }: AnswerProps) {
  return (
    <div className={styles.answer}>
      <label htmlFor={inputId}>A.</label>
      <textarea rows={6} id={inputId}></textarea>
    </div>
  )
}