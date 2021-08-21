// Styles
import styles from './Selector.module.scss';

interface SelectorProps {
  className?: string;
  choices: string[];
  value: string;
  setValue: (role: string) => void;
};

export default function Selector({ className, choices, value, setValue }: SelectorProps) {

  const selectorClassName = (className ? className + ' ' : '') + styles.selector;

  return (
    <select className={selectorClassName} value={value} onChange={event => setValue(event.target.value)}>
      {choices.map(choice =>
        <option key={choice} value={choice}>{choice}</option>
      )}
    </select>
  );
}