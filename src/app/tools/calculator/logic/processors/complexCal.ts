import { CalculatorState, CalculatorKey } from "../constants";

export default function complexCalculator(
  state: CalculatorState,
  key: CalculatorKey
) {
  const entryKey = state.nextEntry !== null ? "nextEntry" : "currentEntry";
  const currentValue = String(state[entryKey]);

  switch (key.value) {
    case "float":
      if (currentValue.includes(".")) {
        return state;
      }
      return {
        ...state,
        [entryKey]: `${currentValue}.`,
        float: true,
      };

    case "change_sign":
      return {
        ...state,
        [entryKey]: Number(currentValue) * -1,
      };

    case "sqrt":
      return {
        ...state,
        [entryKey]: Math.sqrt(Number(currentValue)),
      };

    default:
      return state;
  }
}
