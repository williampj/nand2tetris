#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
import path from 'path';
import Parser from './parser.js';
import CodeWriter from './codewriter.js';

class Main {
  static #outputFilePath(inputFilePath) {
    return path.resolve('./', inputFilePath).replace('vm', 'asm');
  }

  constructor(VMFileName) {
    this.parser = new Parser(VMFileName);
    this.codeWriter = new CodeWriter(Main.#outputFilePath(VMFileName));
  }

  // async translateVMFile() {
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
    console.log('Finished translating file');
  }
}
const VMFileName = `${process.argv[2]}`;
const translator = new Main(VMFileName);
translator.translateVMFile();
