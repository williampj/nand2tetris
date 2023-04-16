#!/usr/bin/env node
/* eslint-disable import/extensions */
import path from 'path';
import { readdirSync } from 'fs';
import Parser from './parser.js';
import CodeWriter from './codewriter.js';

class Main {
  #addBootstrap;
  #isSingleFile = () => /.vm$/.test(this.inputFilePath);

  #setInAndOutputFilePath(inputFilePath) {
    this.inputFilePath = path.resolve(inputFilePath);
    const filePathArray = this.inputFilePath.split('/');
    const fileName = `${filePathArray[filePathArray.length - 1]}.asm`;

    if (this.#isSingleFile()) {
      this.outputFilePath = this.inputFilePath.replace('vm', 'asm');
    } else {
      this.outputFilePath = this.inputFilePath.concat(`/${fileName}`);
    }
  }

  #retrieveFilesToInterpret() {
    const sysVMRegEx = /(Sys\.vm)$/;
    this.files = [];
    if (this.#isSingleFile()) {
      this.files.push(path.resolve('./', this.inputFilePath));
    } else {
      readdirSync(this.inputFilePath).forEach((file) => {
        if (sysVMRegEx.test(file)) {
          this.#addBootstrap = true;
        }
        if (file.endsWith('.vm')) {
          this.files.push(path.resolve(this.inputFilePath, file));
        }
      });
    }
  }

  constructor(VMFileName) {
    this.#setInAndOutputFilePath(VMFileName);
    this.#retrieveFilesToInterpret();
    this.codeWriter = new CodeWriter(this.outputFilePath, this.#addBootstrap);
  }

  async iterateFiles() {
    for (const file of this.files) {
      this.parser = new Parser(file);
      this.codeWriter.setFileName(file);
      await this.#translateVMFile();
    }
    await this.codeWriter.close();
    console.log(`\nFinished translating the following files: 
    \n${this.files.join('\n\n')}
    \ninto the following Hack assembly file: \n\n${this.outputFilePath}`);
  }

  async #translateVMFile() {
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
        case (Parser.COMMAND_TYPES.C_FUNCTION):
        case (Parser.COMMAND_TYPES.C_CALL):
        case (Parser.COMMAND_TYPES.C_RETURN):
          await this.codeWriter.writeFunctionCommands(
            {
              command,
              functionName: this.parser.arg1(),
              numArguments: this.parser.arg2(),
            },
          );
          break;
        case (Parser.COMMAND_TYPES.C_LABEL):
        case (Parser.COMMAND_TYPES.C_GOTO):
        case (Parser.COMMAND_TYPES.C_IF):
          await this.codeWriter.writeBranching(
            { command, label: this.parser.arg1() },
          );
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
  }
}
const VMFileName = `${process.argv[2]}`;
const translator = new Main(VMFileName);
translator.iterateFiles();
