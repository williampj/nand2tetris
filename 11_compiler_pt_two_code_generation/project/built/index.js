#!/usr/bin/env node
/* eslint-disable import/extensions */
import * as path from 'path';
import { createWriteStream, readdirSync } from 'fs';
import JackTokenizer from './JackTokenizer.js';
import CompilationEngine from './CompilationEngine.js';
import SymbolTable from './SymbolTable.js';
import VMWriter from './VMWriter.js';
class JackAnalyzer {
    static getFileNamesToCompile(inputFilePath) {
        const files = [];
        if (JackAnalyzer.isSingleFile(inputFilePath)) {
            files.push(path.resolve('./', inputFilePath));
        }
        else {
            readdirSync(inputFilePath).forEach((file) => {
                if (file.endsWith('.jack')) {
                    files.push(path.resolve(inputFilePath, file));
                }
            });
        }
        return files;
    }
    constructor(inputName) {
        const inputFilePath = path.resolve(inputName);
        this.inputFiles = JackAnalyzer.getFileNamesToCompile(inputFilePath);
    }
    /* Orchestration engine that iterates and ensures the compilation of each input file */
    compileFiles() {
        for (const inputFile of this.inputFiles) {
            const tokenizer = new JackTokenizer(inputFile);
            const writeStream = createWriteStream(inputFile.replace('jack', 'vm'));
            const classSymbolTable = new SymbolTable();
            const methodSymbolTable = new SymbolTable();
            const vmWriter = new VMWriter(writeStream);
            const compilationEngine = new CompilationEngine(tokenizer, methodSymbolTable, classSymbolTable, vmWriter);
            compilationEngine.compileClass();
            vmWriter.close();
        }
        console.log(`Finished compiling the following files: \n\n${this.inputFiles.join('\n\n')}`);
    }
}
JackAnalyzer.isSingleFile = (inputFilePath) => /.jack$/.test(inputFilePath);
const inputName = `${process.argv[2]}`;
const analyzer = new JackAnalyzer(inputName);
analyzer.compileFiles();
