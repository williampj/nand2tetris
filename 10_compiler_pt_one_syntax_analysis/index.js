#!/usr/bin/env node
/* eslint-disable import/extensions */
import path from 'path';
import { createWriteStream, readdirSync } from 'fs';
import JackTokenizer from './JackTokenizer.js';
import CompilationEngine from './CompilationEngine.js';

class JackAnalyzer {
  static #isSingleFile = (inputFilePath) => /.jack$/.test(inputFilePath);

  static #getFileNamesToCompile(inputFilePath) {
    const files = [];
    if (JackAnalyzer.#isSingleFile(inputFilePath)) {
      files.push(path.resolve('./', inputFilePath));
    } else {
      readdirSync(inputFilePath).forEach((file) => {
        if (file.endsWith('.jack')) {
          files.push(path.resolve(inputFilePath, file));
        }
      });
    }

    return files;
  }

  #inputFiles;

  constructor(inputName) {
    const inputFilePath = path.resolve(inputName);
    this.#inputFiles = JackAnalyzer.#getFileNamesToCompile(inputFilePath);
  }

  compileFiles() {
    for (const inputFile of this.#inputFiles) {
      const tokenizer = new JackTokenizer(inputFile);
      const writeStream = createWriteStream(inputFile.replace('jack', 'xml'));
      const compilationEngine = new CompilationEngine(tokenizer, writeStream);
      compilationEngine.compileClass();
      writeStream.close();
    }
    console.log(`Finished compiling the following files: \n\n${this.#inputFiles.join('\n\n')}`);
  }
}

const inputName = `${process.argv[2]}`;
const analyzer = new JackAnalyzer(inputName);
analyzer.compileFiles();
