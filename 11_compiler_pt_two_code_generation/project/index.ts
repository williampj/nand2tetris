#!/usr/bin/env node
/* eslint-disable import/extensions */
import * as path from 'path';
import { WriteStream, createWriteStream, readdirSync } from 'fs';
import JackTokenizer from './JackTokenizer.js';
import CompilationEngine from './CompilationEngine.js';
import SymbolTable from './SymbolTable.js';
import VMWriter from './VMWriter.js';

class JackAnalyzer {
  private static isSingleFile = (inputFilePath: string): boolean => /.jack$/.test(inputFilePath);

  private static getFileNamesToCompile(inputFilePath: string): Array<string> {
    const files = [];
    if (JackAnalyzer.isSingleFile(inputFilePath)) {
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

  private inputFiles: Array<string>;

  constructor(inputName: string) {
    const inputFilePath: string = path.resolve(inputName);
    this.inputFiles = JackAnalyzer.getFileNamesToCompile(inputFilePath);    
  }

  /* Orchestration engine that iterates and ensures the compilation of each input file */
  compileFiles(): void {
    for (const inputFile of this.inputFiles) {
      const tokenizer: JackTokenizer = new JackTokenizer(inputFile);
      const writeStream: WriteStream = createWriteStream(inputFile.replace('jack', 'vm'));
      const classSymbolTable: SymbolTable = new SymbolTable();
      const methodSymbolTable: SymbolTable = new SymbolTable();
      const vmWriter: VMWriter = new VMWriter(writeStream);
      const compilationEngine: CompilationEngine = new CompilationEngine(tokenizer, methodSymbolTable, classSymbolTable, vmWriter);
      compilationEngine.compileClass();
      vmWriter.close();
    }
    console.log(`Finished compiling the following files: \n\n${this.inputFiles.join('\n\n')}`);
  }
}

const inputName: string = `${process.argv[2]}`;
const analyzer: JackAnalyzer = new JackAnalyzer(inputName);
analyzer.compileFiles();
