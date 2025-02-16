import { CalculatorState, CalculatorKey } from './constants';
import processors from "./processors";

export default function processKey(state: CalculatorState, key: CalculatorKey) {
  return processors[key.type](state, key);
} 