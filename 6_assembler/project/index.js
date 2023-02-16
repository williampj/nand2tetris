#!/usr/bin/env node
/* eslint-disable lines-around-comment */
/* eslint-disable no-console */
import { createWriteStream } from "fs";
import Parser from "./parser.js";

class Assembler {
  constructor(fileName) {
    this.parser = new Parser(fileName);
    this.fileName = fileName;
  }

  async createDestinationFile() {
    this.outputFileName = this.fileName.replace(".asm", ".hack");
    this.writeStream = createWriteStream(this.outputFileName);
  }

  async assembleFile() {
    try {
      while (this.parser.hasMoreLines()) {
        const parsedLine = this.parser.advance();
        if (this.writeStream.writableLength === 0) {
          // No linebreak for the first line
          this.writeStream.write(`${parsedLine}`);
        } else {
          this.writeStream.write(`\n${parsedLine}`);
        }
        console.log(`added line ${parsedLine} to the output file`);
      }
    } finally {
      await this.writeStream?.end();
      console.log(
        `The Program Has Finished Assembling ${this.fileName} into ${this.outputFileName}`
      );
    }
  }
}

const fileName = `${process.argv[2]}.asm`;
const assembler = new Assembler(fileName);
assembler.createDestinationFile();
assembler.assembleFile();
