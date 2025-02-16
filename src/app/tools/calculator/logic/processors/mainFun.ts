import { CalculatorState, CalculatorKey } from '../constants';
import { initialState } from '../../page';

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
        ...initialState,
        open: true,
        automaticTurnOff: state.automaticTurnOff
      };

    default:
      return state;
  }
} 