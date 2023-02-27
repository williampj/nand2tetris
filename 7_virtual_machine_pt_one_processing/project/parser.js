/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import { readFileSync } from 'fs';

export default class Parser {
  #VMInstructions;
  #numberOfVMInstructions;
  #currentInstructionNumber = 0;
  #currentInstruction;
  #commandType;
  #arg1;
  #arg2;

  static COMMAND_TYPES = {
    C_ARITHMETIC: 'C_ARITHMETIC',
    C_CALL: 'C_CALL',
    C_COMPARISON: 'C_COMPARISON',
    C_FUNCTION: 'C_FUNCTION',
    C_GOTO: 'C_GOTO',
    C_IF: 'C_IF',
    C_LABEL: 'C_LABEL',
    C_LOGIC: 'C_LOGIC',
    C_PUSH: 'C_PUSH',
    C_POP: 'C_POP',
    C_RETURN: 'C_RETURN',
  };

  #loadVMInstructions(VMFileName) {
    try {
      const VMFile = readFileSync(VMFileName).toString().split('\r\n');
      this.#VMInstructions = VMFile.filter(
        (line) => !!line.trim() && !line.startsWith('//'),
      );
      this.#numberOfVMInstructions = this.#VMInstructions.length;
    } catch (e) {
      console.error(e);
    }
  }

  #setCommandType() {
    if (/(add)|(sub)|(neg)/.test(this.#currentInstruction)) {
      this.#commandType = Parser.COMMAND_TYPES.C_ARITHMETIC;
    } else if (/(lt)|(eq)|(gt)/.test(this.#currentInstruction)) {
      this.#commandType = Parser.COMMAND_TYPES.C_COMPARISON;
    } else if (/(and)|(or)|(not)/.test(this.#currentInstruction)) {
      this.#commandType = Parser.COMMAND_TYPES.C_LOGIC;
    } else if (/push/.test(this.#currentInstruction)) {
      this.#commandType = Parser.COMMAND_TYPES.C_PUSH;
    } else if (/pop/.test(this.#currentInstruction)) {
      this.#commandType = Parser.COMMAND_TYPES.C_POP;
    } else {
      throw new Error(`could not determine the command type for ${this.#currentInstruction}`);
    }
  }

  #setArg1() {
    if (['add', 'sub', 'neg', 'lt', 'eq', 'gt', 'and', 'or', 'not'].includes(this.#currentInstruction)) {
      this.#arg1 = this.#currentInstruction;
    } else {
      // push, pop
      this.#arg1 = this.#currentInstruction.split(' ')[1];
    }
  }

  #setArg2() {
    this.#arg2 = this.#currentInstruction.split(' ')[2];
  }

  constructor(VMFileName) {
    this.#loadVMInstructions(VMFileName);
  }

  hasMoreLines() {
    return !!(this.#currentInstructionNumber < this.#numberOfVMInstructions);
  }

  advance() {
    this.#currentInstruction = this.#VMInstructions[this.#currentInstructionNumber];
    this.#setCommandType();

    if (this.#commandType !== Parser.COMMAND_TYPES.C_RETURN) this.#setArg1();

    if ([Parser.COMMAND_TYPES.C_PUSH, Parser.COMMAND_TYPES.C_POP,
      Parser.COMMAND_TYPES.C_FUNCTION, Parser.COMMAND_TYPES.C_CALL,
    ].includes(this.#commandType)) this.#setArg2();

    this.#currentInstructionNumber += 1;
  }

  commandType() {
    return this.#commandType;
  }

  arg1() {
    return this.#arg1;
  }

  arg2() {
    return this.#arg2;
  }
}
