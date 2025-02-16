import mainProcessor from './mainFun';
import basicProcessor from './basicCal';
import memoryProcessor from './memoryCal';
import mathProcessor from './complexCal';
import numberProcessor from './number';

import { keyTypes } from "../constants";
const { MAIN, BASIC, MEMORY, MATH, NUMBER } = keyTypes;

export default {
  [MAIN]: mainProcessor,
  [BASIC]: basicProcessor,
  [MEMORY]: memoryProcessor,
  [MATH]: mathProcessor,
  [NUMBER]: numberProcessor,
}; 