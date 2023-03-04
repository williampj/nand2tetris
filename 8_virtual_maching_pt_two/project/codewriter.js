import { createWriteStream } from 'fs';

export default class CodeWriter {
  static #segmentSymbols = {
    argument: 'ARG',
    local: 'LCL',
    temp: 'TEMP',
    this: 'THIS',
    that: 'THAT',
  };

  #comparisonJumpNum = 0;
  #currentFunction;
  #outputFile;
  #staticFileName;
  #returnNumber = 1;

  #createOutputFile(outputFilePath) {
    this.#outputFile = createWriteStream(outputFilePath);
  }

  #setStaticVariable(fileName) {
    const pathArray = fileName.split('/');
    this.#staticFileName = pathArray[pathArray.length - 1].split('.')[0];
  }

  async #writeBootstrapCode() {
    this.#outputFile.write(
      `// initializing @SP to 256
@256
D=A
@SP
M=D
`,
    );
    await this.#writeCall({ functionName: 'Sys.init', numArguments: 0 });
  }

  async #writeArithmeticTopTwoElements(command) {
    await this.#outputFile.write(`@SP 
AM=M-1 
D=M 
@SP 
AM=M-1 
${command === 'add' ? 'D=M+D' : 'D=M-D'}
@SP
A=M
M=D
@SP
M=M+1
`);
  }

  async #writeBitwiseNotTopElement() {
    await this.#outputFile.write(
      `@SP
AM=M-1
M=!M
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
@TRUE${this.#comparisonJumpNum}
D;${jumpCondition}
@FALSE${this.#comparisonJumpNum}
0;JMP

(TRUE${this.#comparisonJumpNum})
  @1
  D=-A
  @SP
  A=M
  M=D
  @END_COMPARISON${this.#comparisonJumpNum}
  0;JMP

(FALSE${this.#comparisonJumpNum})
  @SP
  A=M
  M=0

(END_COMPARISON${this.#comparisonJumpNum})
  @SP
  M=M+1 
`,
    );

    this.#comparisonJumpNum += 1;
  }

  async #writeCall({ functionName, numArguments }) {
    const returnAddress = `${this.#currentFunction ? `${this.#currentFunction}.return` : 'returnAddress'}${this.#returnNumber}`;
    const pushVariableToStack = `D=M
@SP
A=M
M=D
@SP
M=M+1`;

    this.#outputFile.write(
      `@${returnAddress}
D=A
@SP
A=M
M=D
@SP
M=M+1

// push LCL
@LCL
${pushVariableToStack}

// push ARG
@ARG
${pushVariableToStack}

// push THIS
@THIS
${pushVariableToStack}

// push THAT
@THAT
${pushVariableToStack}

// ARG = SP - 5 - nArgs
@SP
D=M
@${numArguments}
D=D-A
@5
D=D-A
@ARG
M=D

// LCL = SP
@SP
D=M
@LCL
M=D

// go to
@${functionName}
0;JMP
(${returnAddress})
`,
    );
    this.#returnNumber += 1;
  }

  async #writeFunction({ functionName, numArguments }) {
    this.#currentFunction = functionName;
    let localArguments = '';
    for (let i = 0; i < numArguments; i += 1) {
      localArguments += `@${i}
D=A
@LCL
A=M+D
M=0
@SP
M=M+1
`;
    }
    this.#outputFile.write(
      `(${functionName})
${localArguments}`,
    );
  }

  async #writeReturn() {
    this.#outputFile.write(
      `// R13: frame = LCL
@LCL
D=M
@R13
M=D

// R14: return address = *(frame - 5)
@R13
D=M
@5
A=D-A
D=M
@R14
M=D

// *ARG = pop()
@SP
AM=M-1
D=M
@ARG
A=M
M=D

// SP = ARG+1
@ARG
D=M+1
@SP
M=D

// THAT = *(frame-1)
@R13
A=M-1
D=M
@THAT
M=D

// THIS = *(frame-2)
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D

// ARG = *(frame-3)
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D

// LCL = *(frame-4)
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D

// goto retAddr
@R14
A=M
0;JMP
`,
    );
  }

  async #writeLogicTopTwoElements(command) {
    this.#outputFile.write(
      `@SP
AM=M-1
D=M
@SP
AM=M-1
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

  async #writeNegateTopElement() {
    await this.#outputFile.write(
      `@SP
AM=M-1
M=-M
@SP
M=M+1
`,
    );
  }

  async #writePopPointer(variable) {
    await this.#outputFile.write(
      `@SP
AM=M-1
D=M
@${variable}
M=D
`,
    );
  }

  async #writePopSegment({ index, segment }) {
    const segmentSymbol = CodeWriter.#segmentSymbols[segment];

    await this.#outputFile.write(
      `@${segmentSymbol}
D=M
@${index}
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
`,
    );
  }

  async #writePopStatic(index) {
    await this.#outputFile.write(
      `@SP
AM=M-1
D=M
@${this.#staticFileName}.${index}
M=D
`,
    );
  }

  async #writePopTemp(index) {
    const tempAddress = 5 + index;
    await this.#outputFile.write(`@SP
AM=M-1
D=M
@${tempAddress}
M=D
`);
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
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
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

  async #writeLabel(label) {
    await this.#outputFile.write(
      `(${label})
`,
    );
  }

  async #writeGoTo(label) {
    await this.#outputFile.write(
      `@${label}
0;JMP
`,
    );
  }

  async #writeIfGoTo(label) {
    await this.#outputFile.write(
      `@SP
AM=M-1
D=M
@${label}
D;JNE
`,
    );
  }

  constructor(outputFilePath) {
    this.#createOutputFile(outputFilePath);
    this.#writeBootstrapCode();
  }

  setFileName(fileName) {
    this.#setStaticVariable(fileName);
  }

  async writeArithmetic(command) {
    await this.#outputFile.write(`// ${command}\n`);
    if (command === 'neg') {
      await this.#writeNegateTopElement();
      return;
    }
    // add, sub
    this.#writeArithmeticTopTwoElements(command);
  }

  async writeBranching({ command, label }) {
    await this.#outputFile.write(`// ${command} ${label}\n`);
    if (command === 'label') {
      await this.#writeLabel(label);
      return;
    }

    if (command === 'goto') {
      await this.#writeGoTo(label);
      return;
    }

    if (command === 'if') {
      await this.#writeIfGoTo(label);
    }
  }

  async writeComparison(command) {
    await this.#outputFile.write(`// ${command}\n`);
    // lt, eq, gt
    this.#writeComparisonPrivate(command);
  }

  async writeFunctionCommands({ command, functionName, numArguments }) {
    if (command === 'return') {
      await this.#outputFile.write(`\n// ${command}\n`);
    } else {
      await this.#outputFile.write(`// ${command} ${functionName} ${numArguments}\n`);
    }

    if (command === 'call') {
      await this.#writeCall({ functionName, numArguments });
      return;
    }
    if (command === 'function') {
      await this.#writeFunction({ functionName, numArguments });
      return;
    }
    if (command === 'return') {
      await this.#writeReturn();
    }
  }

  async writeLogic(command) {
    await this.#outputFile.write(`// ${command}\n`);
    if (command === 'not') {
      this.#writeBitwiseNotTopElement(command);
      return;
    }
    // and, or
    this.#writeLogicTopTwoElements(command);
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
    await this.#outputFile.write(
      `// closing loop
    (END)
    @END
    0;JMP`,
    );
    await this.#outputFile?.end();
  }
}
