import React from 'react';
import WalletScreen from './(tabs)/wallet';

// Lightweight ErrorBoundary for runtime debugging in Expo Go
class ErrorBoundary extends React.Component<any, { hasError: boolean; error?: Error }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <div style={{ padding: 20 }}>
            <h2>Something went wrong</h2>
            <pre>{String(this.state.error)}</pre>
          </div>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default function WalletRoute() {
  return (
    <ErrorBoundary>
      <WalletScreen />
    </ErrorBoundary>
  );
}
