// Constants
export const keyTypes = {
  MAIN: "MAIN_FUNC",
  BASIC: "BASIC_FUNC",
  MEMORY: "MEMORY_FUNC",
  MATH: "MATH_FUNC",
  NUMBER: "NUMBER_FUNC",
} as const;

export type KeyType = (typeof keyTypes)[keyof typeof keyTypes];

export interface CalculatorState {
  open: boolean;
  currentEntry: number;
  nextEntry: number | null;
  operation: string | null;
  float: boolean;
  memory: number | null;
  automaticTurnOff: NodeJS.Timeout | null;
  lastAction: string | null;
  lastCalculation: {
    operation?: string | null;
    nextEntry?: number | null;
  };
}

export interface CalculatorKey {
  type: KeyType;
  value: string;
  label?: string;
  extraClass?: string;
}

// Processors
export { default as basicCalculator } from "./processors/basicCal";
export { default as memoryCalculator } from "./processors/memoryCal";
export { default as mathCalculator } from "./processors/complexCal";
export { default as numberProcessor } from "./processors/number";
export { default as mainFunction } from "./processors/mainFun";

// Process Key
export { default as processKey } from "./processKey";
