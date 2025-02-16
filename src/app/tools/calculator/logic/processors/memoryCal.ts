import { CalculatorState, CalculatorKey } from '../constants';
import { calculate } from './basicCal';

export default function memoryCalculator(state: CalculatorState, key: CalculatorKey) {
  const entryKey = state.nextEntry !== null ? "nextEntry" : "currentEntry";
  
  switch (key.value) {
    case "clear":
      return {
        ...state,
        memory: null,
      };

    case "recall":
      if (state.memory === null) {
        return state;
      }
      return {
        ...state,
        [entryKey]: state.memory,
      };

    case "plus":
    case "minus":
      return {
        ...state,
        memory: calculate({
          ...state,
          operation: key.value,
          currentEntry: state.memory || 0,
          nextEntry: state[entryKey]
        })
      };

    default:
      return state;
  }
} 