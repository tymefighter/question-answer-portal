// Library
import React from 'react';

// Styles 
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: React.ReactElement;
};

interface ErrorBoundaryState {
  errorMessage?: string;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return {
      errorMessage: error.message
    };
  }

  render() {
    return this.state.errorMessage ? (
      <>
        <h1 className={styles.errorHeading}>An Error has occurred</h1>
        <p className={styles.errorInfo}>
          {this.state.errorMessage}
        </p>
      </>
    )
    : this.props.children;
  }
}