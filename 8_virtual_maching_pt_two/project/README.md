# README.MD

1. This project marks the completion of the VM translator that translates VM instruction into Hack assembly instructions. In order to run the the executable of this complete translator, the command `VMTranslatorTwo` must be used plus the folder or single file of vm commands to translate.
   Example: `VMTranslatorTwo ./ProgramFlow/BasicLoop`.
   Using `VMTranslatorOne` would run the incomplete VM translator of project 7.

2. The tests `ProgramFlow/BasicLoop`, `ProgramFlow/FibonacciSeries` and `FunctionCalls/SimpleFunction` do not require bootstrap code that initiates the stack pointer at memory space 256 and calls the `Sys.init` function to start the interpretation. In fact the tests will fail if this bootstrap code is included. To interpret these files correctly, the line `this.#writeBootstrapCode();` in the `codewriter.js` constructor method must be commented out.
