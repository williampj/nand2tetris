/* eslint-disable prefer-destructuring */
/* eslint-disable no-bitwise */
import { createWriteStream } from 'fs';

export default class CodeWriter {
  static #segmentSymbols = {
    argument: 'ARG',
    local: 'LCL',
    temp: 'TEMP',
    this: 'THIS',
    that: 'THAT',
  };

  #outputFile;
  #staticFileName;
  #comparisonJumps = 0;

  async #createOutputFile(outputFilePath) {
    this.#outputFile = createWriteStream(outputFilePath);
  }

  // LCL, ARG, THIS, THAT Later
  async #writeInitializePointers() {
    await this.#outputFile.write(
      `// initializing @SP to 256
@256
D=A
@SP
M=D
// initializing @LCL to 300
@300
D=A
@LCL
M=D
// initializing @ARG to 400
@400
D=A
@ARG
M=D
// initializing @THIS to 3000
@3000
D=A
@THIS
M=D
// initializing @THAT to 3010 
@3010
D=A
@THAT
M=D
`,
    );
  }

  async #writeArithmeticTopTwoElements(command) {
    await this.#outputFile.write(`// ${command}
@SP 
M=M-1 
A=M 
D=M 
@SP 
M=M-1 
A=M
${command === 'add' ? 'D=M+D' : 'D=M-D'}
@SP
A=M
M=D
@SP
M=M+1
`);
  }

  async #writeNegateTopElement() {
    await this.#outputFile.write(
      `// neg
@SP
M=M-1
A=M
M=-M
@SP
M=M+1
`,
    );
  }

  async #writeBitwiseNotTopElement() {
    await this.#outputFile.write(
      `// not
@SP
M=M-1
A=M
D=M
D=!D
M=D
@SP
M=M+1
`,
    );
  }

  async #writeLogicTopTwoElements(command) {
    await this.#outputFile.write(
      `// ${command}
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
A=M
D=A${command === 'and' ? '&' : '|'}D
@SP
A=M
M=D
@SP
M=M+1
`,
    );
  }

  async #writeComparisonPrivate(command) {
    let jumpCondition;
    if (command === 'lt') {
      jumpCondition = 'JLT';
    } else if (command === 'eq') {
      jumpCondition = 'JEQ';
    } else {
      jumpCondition = 'JGT';
    }

    await this.#outputFile.write(
      `@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE${this.#comparisonJumps}
D;${jumpCondition}
@FALSE${this.#comparisonJumps}
0;JMP

(TRUE${this.#comparisonJumps})
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON${this.#comparisonJumps}
  0;JMP

(FALSE${this.#comparisonJumps})
  @SP
  A=M
  M=0

(END_COMPARISON${this.#comparisonJumps})
  @SP
  M=M+1 
`,
    );

    this.#comparisonJumps += 1;
  }

  async #writePopPointer(variable) {
    await this.#outputFile.write(
      `@SP
M=M-1
A=M
D=M
@${variable}
M=D
`,
    );
  }

  async #writePopTemp(index) {
    const tempAddress = 5 + index;
    await this.#outputFile.write(`@SP
M=M-1
A=M
D=M
@${tempAddress}
M=D
`);
  }

  async #writePushTemp(index) {
    const tempAddress = 5 + index;
    await this.#outputFile.write(`@${tempAddress}
D=M
@SP
A=M
M=D
@SP
M=M+1
`);
  }

  async #writePopSegment({ index, segment }) {
    const segmentSymbol = CodeWriter.#segmentSymbols[segment];

    await this.#outputFile.write(
      `@${segmentSymbol}
A=M
D=A
@${index}
D=D+A 
@SP
M=M-1
A=M
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
`,
    );
  }

  async #writePushConstant(index) {
    await this.#outputFile.write(
      `@${index}
D=A
@SP
A=M
M=D
@SP
M=M+1
`,
    );
  }

  async #writePushPointer(index) {
    await this.#outputFile.write(
      `@${index === '0' ? 'THIS' : 'THAT'}
D=M
@SP
A=M
M=D
@SP
M=M+1
`,
    );
  }

  async #writePushSegment({ index, segment }) {
    await this.#outputFile.write(
      `@${index}
D=A
@${CodeWriter.#segmentSymbols[segment]}
A=M
A=A+D
D=M
@SP
A=M
M=D
@SP
M=M+1
`,
    );
  }

  async #writePopStatic(index) {
    await this.#outputFile.write(
      `@SP
M=M-1
A=M
D=M
@${this.#staticFileName}.${index}
M=D
`,
    );
  }

  async #writePushStatic(index) {
    await this.#outputFile.write(
      `@${this.#staticFileName}.${index}
D=M
@SP
A=M
M=D
@SP
M=M+1
`,
    );
  }

  #setStaticVariable(outputFilePath) {
    const pathArray = outputFilePath.split('/');
    this.#staticFileName = pathArray[pathArray.length - 1].split('.')[0];
  }

  constructor(outputFilePath) {
    this.#createOutputFile(outputFilePath);
    this.#setStaticVariable(outputFilePath);
  }

  async writeArithmetic(command) {
    if (command === 'neg') {
      await this.#writeNegateTopElement();
      return;
    }
    // add, sub
    await this.#writeArithmeticTopTwoElements(command);
  }

  async writeComparison(command) {
    // lt, eq, gt
    await this.#writeComparisonPrivate(command);
  }

  async writeLogic(command) {
    if (command === 'not') {
      await this.#writeBitwiseNotTopElement(command);
      return;
    }
    // and, or
    await this.#writeLogicTopTwoElements(command);
  }

  async writePushPop({ command, segment, index }) {
    const numberIndex = Number(index);
    await this.#outputFile.write(`// ${command} ${segment} ${index}\n`);

    if (segment === 'constant') {
      await this.#writePushConstant(index);
      return;
    }

    if (command === 'push' && segment === 'temp') {
      await this.#writePushTemp(numberIndex);
      return;
    }

    if (command === 'pop' && segment === 'temp') {
      await this.#writePopTemp(numberIndex);
      return;
    }

    if (command === 'push' && segment === 'pointer') {
      await this.#writePushPointer(index);
      return;
    }

    if (command === 'pop' && segment === 'pointer') {
      const variable = index === '0' ? 'THIS' : 'THAT';
      await this.#writePopPointer(variable);
      return;
    }

    if (command === 'pop' && segment === 'static') {
      await this.#writePopStatic(numberIndex);
      return;
    }

    if (command === 'push' && segment === 'static') {
      await this.#writePushStatic(numberIndex);
      return;
    }

    if (command === 'push') {
      await this.#writePushSegment({ index, segment });
      return;
    }

    if (command === 'pop') {
      await this.#writePopSegment({ segment, index: numberIndex });
    }
  }

  async close() {
    await this.#outputFile?.end();
  }
}
