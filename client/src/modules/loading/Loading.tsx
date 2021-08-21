import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <>
      <h1 className={styles.loadingHeading}>Loading</h1>
      <div className={styles.loadingCircle}>
        <div className={styles.loadingInnerCircle}></div>
      </div>
    </>
  );
}