/* eslint-disable lines-around-comment */
import * as fs from "fs";
import path from "path";
import Code from "./code.js";

export default class Parser {
  constructor(fileName) {
    this.loadFile(fileName);
    this.loadPredefinedSymbols();
    this.removeLabels();
    this.replaceSymbols();
  }

  async loadFile(fileName) {
    const filePath = path.resolve("./", fileName);
    const text = fs.readFileSync(filePath, {
      encoding: "utf-8",
      flag: "r",
    });

    const arrayOfLines = text.split("\n");

    // removes comment and whitespace lines
    this.inputLines = arrayOfLines.filter((line) => {
      const trimmedLine = line.trim();
      return (
        !!trimmedLine && !trimmedLine.startsWith("//") && trimmedLine !== "\r"
      );
    });
    // Removes comments from end of lines
    this.inputLines = this.inputLines.map((line) => {
      return line.split("//")[0].trim();
    });

    this.currentLineNumber = 0;
  }

  loadPredefinedSymbols() {
    this.symbols = {
      R0: 0,
      R1: 1,
      R2: 2,
      R3: 3,
      R4: 4,
      R5: 5,
      R6: 6,
      R7: 7,
      R8: 8,
      R9: 9,
      R10: 10,
      R11: 11,
      R12: 12,
      R13: 13,
      R14: 14,
      R15: 15,
      SP: 0,
      LCL: 1,
      ARG: 2,
      THIS: 3,
      THAT: 4,
      SCREEN: 16384,
      KBD: 24576,
    };
  }

  removeLabels() {
    let removedLabels = 0;
    this.inputLines = this.inputLines.filter((line, lineNumber) => {
      // Skip all lines without lables
      if (!line.startsWith("(")) return true;

      // Store the label line number (while accounting for previously removed labels)
      // in symbols table and remove the label from inputLines array
      const label = line.slice(1, line.length - 1);
      this.symbols[label] = lineNumber - removedLabels;
      removedLabels += 1;
      return false;
    });
    this.totalNumberOfLines = this.inputLines.length;
    // console.log(`Removed ${removedLabels} labels from the file`); // TODO - remove
  }

  replaceSymbols() {
    let nextAvailableVariableSpace = 16;
    this.inputLines.map((line) => {
      // skip lines without variables
      if (!line.startsWith("@") || Number(line.slice(1)) >= 0) return line;

      const variable = line.slice(1);
      // Adds variable to memory if not currently assigned
      if (this.symbols[variable] === undefined) {
        this.symbols[variable] = nextAvailableVariableSpace;
        nextAvailableVariableSpace += 1;
      }

      return `@${this.symbols[variable]}`;
    });
  }

  hasMoreLines() {
    return !!(this.currentLineNumber < this.totalNumberOfLines);
  }

  advance() {
    this.currentInstruction = this.inputLines[this.currentLineNumber];
    this.updateInstructionType();
    switch (this.instructionType) {
      case "A_INSTRUCTION":
        this.translatedInstruction = this.translateAInstruction();
        break;
      case "C_INSTRUCTION":
        this.translatedInstruction = this.translateCInstruction();
        break;
      default:
        console.log(`Unidentified instruction type found: 
        Current Instruction: ${this.currentInstruction} 
        `);
    }
    this.currentLineNumber += 1;
    return this.translatedInstruction;
  }

  translateAInstruction() {
    const binaryTable = [
      16384,
      8192,
      4096,
      2048,
      1024,
      512,
      256,
      128,
      64,
      32,
      16,
      8,
      4,
      2,
      1,
    ];

    const variable = this.currentInstruction.slice(1);
    let decimal;
    if (this.symbols[variable] !== undefined) {
      decimal = this.symbols[variable];
    } else {
      decimal = Number(variable);
    }

    let binaryTranslation = "0";
    for (let i = 0; i < binaryTable.length; i += 1) {
      const binaryTableNumber = binaryTable[i];
      if (decimal >= binaryTableNumber) {
        binaryTranslation += "1";
        decimal -= binaryTableNumber;
      } else {
        binaryTranslation += "0";
      }
    }

    return binaryTranslation;
  }

  translateCInstruction() {
    const code = new Code(this.currentInstruction);
    const prefix = "111";
    const translatedInstruction = prefix + code.comp + code.dest + code.jump;

    return translatedInstruction;
  }

  updateInstructionType() {
    if (this.currentInstruction.startsWith("@")) {
      this.instructionType = "A_INSTRUCTION";
    } else {
      this.instructionType = "C_INSTRUCTION";
    }
  }
}
