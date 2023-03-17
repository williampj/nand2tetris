# Compiler part one - Syntax Analyzer

## Syntax analyzer

- This first version of the compiler compiles high level code in the Java-like Jack language into XML code
- The second part of the compiler in project 11 will complete the compiler by converting Jack code further to VM code. This VM code can then be run directly on a VM emulator or be translated to assembly code (using the project 8 program) to be run on a CPU emulator.

## Running the compiler

- To test the compiler, run the following command
  `JackAnalyzer {fileName || folder}`, whereafter all files with the `.jack` extension will be compiled and written to identically named files with the `.xml` extension in the same folder as the source file.

## Compiler code

- The compiler consists of three modules:
  - The `Main` engine in the `index.js` file
  - The `JackTokenizer` in the `JackTokenizer.js` file
  - The `CompilationEngine` in the `CompilationEngine.js` file
