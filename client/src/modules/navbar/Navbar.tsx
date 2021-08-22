// Components
import { Link } from 'react-router-dom';

// Styles
import styles from './Navbar.module.scss';

interface LabelLink {
  label: string;
  link: string;
};

interface NavbarProps {
  leftLinks?: LabelLink[];
  rightLinks?: LabelLink[];
};

export default function Navbar({ leftLinks, rightLinks }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      {leftLinks && (
        <div className={styles.leftContainer}>
          {leftLinks.map(labelLink => (
            <Link key={labelLink.label} to={labelLink.link}>
              {labelLink.label}
            </Link>
          ))}
        </div>
      )}
      {rightLinks && (
        <div className={styles.rightContainer}>
          {rightLinks.map(labelLink => (
            <Link key={labelLink.label} to={labelLink.link}>
              {labelLink.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}