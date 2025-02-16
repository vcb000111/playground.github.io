export const keyTypes = {
  MAIN: "MAIN_FUNC",
  BASIC: "BASIC_FUNC",
  MEMORY: "MEMORY_FUNC",
  MATH: "MATH_FUNC",
  NUMBER: "NUMBER_FUNC"
} as const;

export type KeyType = typeof keyTypes[keyof typeof keyTypes];

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