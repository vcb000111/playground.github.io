import { CalculatorState, CalculatorKey } from '../constants';

const defaultState: CalculatorState = {
    open: true,
    currentEntry: 0,
    nextEntry: null,
    operation: null,
    float: false,
    memory: null,
    automaticTurnOff: null,
    lastAction: null,
    lastCalculation: {},
};

export default function mainFunction(state: CalculatorState, key: CalculatorKey) {
  switch (key.value) {
    case "off":
      return {
        ...state,
        open: false
      };

    case "on":
    case "clear":
      return {
        ...defaultState,
        open: true,
        automaticTurnOff: state.automaticTurnOff
      };

    default:
      return state;
  }
} 