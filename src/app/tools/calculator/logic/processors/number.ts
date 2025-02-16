import { CalculatorState, CalculatorKey } from '../constants';

export default function numberProcessor(state: CalculatorState, key: CalculatorKey) {
  const { operation, nextEntry, currentEntry, float } = state;
  const value = key.value;

  if (operation === null) {
    if (float) {
      return {
        ...state,
        currentEntry: Number(`${currentEntry}${value}`),
        float: false
      };
    }
    return {
      ...state,
      currentEntry: Number(`${currentEntry === 0 ? '' : currentEntry}${value}`)
    };
  }

  if (float) {
    return {
      ...state,
      nextEntry: Number(`${nextEntry || ''}${value}`),
      float: false
    };
  }

  return {
    ...state,
    nextEntry: Number(`${nextEntry || ''}${value}`)
  };
} 