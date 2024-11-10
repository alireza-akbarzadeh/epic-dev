import { calculateNextValue, calculateStatus, calculateWinner, GameState, isValidGameState } from '../lib/utils';
import { useEffect, useState } from 'react';

const defaultState: GameState = {
  history: [Array(9).fill(null)],
  currentStep: 0,
};

const key = 'tic-tac-toe';
function Board() {
  const [state, setState] = useState<GameState>(() => {
    let localStorage;
    try {
      localStorage = JSON.parse(window.localStorage.getItem(key) ?? '');
    } catch {
      //   something is wrong in localstorage, so don't use it
    }
    return isValidGameState(localStorage) ? localStorage : defaultState;
  });

  const squares = state.history[state.currentStep];

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(index: number) {
    if (winner || squares[index]) return;

    setState((prevState) => {
      const { currentStep, history } = prevState;
      const newHistory = history.slice(0, currentStep + 1);
      const squares = history[currentStep].with(index, nextValue);

      return {
        history: [...newHistory, squares],
        currentStep: newHistory.length,
      };
    });
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  function restart() {
    setState(defaultState);
  }

  const moves = state.history.map((_stepSquare, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start';
    const isCurrentStep = step === state.currentStep;
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setState((prevState) => ({ ...prevState, currentStep: step }))}>
          {desc}
          {isCurrentStep ? '(current)' : ''}
        </button>
      </li>
    );
  });

  function renderSquare(i: number) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      {moves}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

export function TicTacToe() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
