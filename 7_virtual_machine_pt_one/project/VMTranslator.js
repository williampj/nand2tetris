#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import path from 'path';
import Parser from './parser.js';
import CodeWriter from './codewriter.js';

class Main {
  constructor(VMFileName) {
    this.parser = new Parser(VMFileName);
    this.inputFilePath = path.resolve('./', VMFileName);
    this.outputFilePath = this.inputFilePath.replace('vm', 'asm');
    this.codeWriter = new CodeWriter(this.outputFilePath);
  }

  async translateVMFile() {
    while (this.parser.hasMoreLines()) {
      this.parser.advance();
      const commandType = this.parser.commandType();
      const command = commandType.split('_')[1].toLowerCase();

      switch (commandType) {
        case (Parser.COMMAND_TYPES.C_ARITHMETIC):
          await this.codeWriter.writeArithmetic(this.parser.arg1());
          break;
        case (Parser.COMMAND_TYPES.C_COMPARISON):
          await this.codeWriter.writeComparison(this.parser.arg1());
          break;
        case (Parser.COMMAND_TYPES.C_LOGIC):
          await this.codeWriter.writeLogic(this.parser.arg1());
          break;
        case (Parser.COMMAND_TYPES.C_PUSH):
        case (Parser.COMMAND_TYPES.C_POP):
          await this.codeWriter.writePushPop(
            {
              command,
              segment: this.parser.arg1(),
              index: this.parser.arg2(),
            },
          );
          break;
        default:
          throw new Error('Could not determined the instruction type');
      }
    }
    await this.codeWriter.close();
    console.log(`Finished translating file ${this.inputFilePath} to ${this.outputFilePath}`);
  }
}

async function runProgram() {
  const VMFileName = `${process.argv[2]}`;
  const translator = new Main(VMFileName);
  await translator.translateVMFile();
}

runProgram();
