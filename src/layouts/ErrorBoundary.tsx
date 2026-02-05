import React, { ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log('ErrorBoundary Error Details:', error, info);
  }

  private resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) return <>{fallback}</>;

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{error?.message ?? 'Unexpected error'}</Text>
          <Button title="Try again" onPress={this.resetError} />
        </View>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    marginBottom: 16,
  },
});
