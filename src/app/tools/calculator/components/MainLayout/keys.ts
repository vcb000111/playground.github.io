import { keyTypes } from '../../logic/constants';
const { MAIN, BASIC, MEMORY, MATH } = keyTypes;

export default [
  {
    type: MAIN,
    value: "off",
    label: "Off",
    extraClass: "small"
  },
  {
    type: MAIN,
    value: "clear",
    label: "C",
    extraClass: "red"
  },
  {
    type: MAIN,
    value: "on",
    label: "AC",
    extraClass: "red acbutton"
  },
  {
    type: BASIC,
    value: "perform",
    label: "="
  },
  {
    type: BASIC,
    value: "divide",
    label: "÷"
  },
  {
    type: BASIC,
    value: "percentage",
    label: "%"
  },
  {
    type: BASIC,
    value: "multiply",
    label: "X"
  },
  {
    type: BASIC,
    value: "minus",
    label: "-"
  },
  {
    type: BASIC,
    value: "plus",
    label: "+"
  },
  {
    type: MEMORY,
    value: "clear",
    label: "MC"
  },
  {
    type: MEMORY,
    value: "recall",
    label: "MR"
  },
  {
    type: MEMORY,
    value: "minus",
    label: "M-"
  },
  {
    type: MEMORY,
    value: "plus",
    label: "M+"
  },
  {
    type: MATH,
    value: "float",
    label: "."
  },
  {
    type: MATH,
    value: "change_sign",
    label: "+/-"
  },
  {
    type: MATH,
    value: "sqrt",
    label: "√",
    extraClass: "small"
  }
]; 