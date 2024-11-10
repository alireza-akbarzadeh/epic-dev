import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { TicTacToe } from './components/tic-tac-toe.tsx';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      There was an error: <pre style={{ color: 'red', whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TicTacToe />
    </ErrorBoundary>
  );
}

export default App;
