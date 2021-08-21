// Styles
import styles from './Input.module.scss';

interface InputProps {
  inputId: string;
  type: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const Input = ({ inputId, type, label, value, setValue }: InputProps) => (
  <div className={styles.inputContainer}>
    <label htmlFor={inputId}>{label}</label>
    <input id={inputId}
      type={type} value={value} 
      onChange={event => setValue(event.target.value)}
    />
  </div>
);

export default Input;