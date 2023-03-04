// initializing @SP to 256
@256
D=A
@SP
M=D
@returnAddress1
D=A
@SP
A=M
M=D
@SP
M=M+1

// push LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// push ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1

// ARG = SP - 5 - nArgs
@SP
D=M
@0
D=D-A
@5
D=D-A
@ARG
M=D

// LCL = SP
@SP
D=M
@LCL
M=D

// go to
@Sys.init
0;JMP
(returnAddress1)
// function Main.fibonacci 0
(Main.fibonacci)
// push argument 0
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 2
@2
D=A
@SP
A=M
M=D
@SP
M=M+1
// lt
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE0
D;JLT
@FALSE0
0;JMP

(TRUE0)
  @1
  D=-A
  @SP
  A=M
  M=D
  @END_COMPARISON0
  0;JMP

(FALSE0)
  @SP
  A=M
  M=0

(END_COMPARISON0)
  @SP
  M=M+1 
// if IF_TRUE
@SP
AM=M-1
D=M
@IF_TRUE
D;JNE
// goto IF_FALSE
@IF_FALSE
0;JMP
// label IF_TRUE
(IF_TRUE)
// push argument 0
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1

// return
// R13: frame = LCL
@LCL
D=M
@R13
M=D

// R14: return address = *(frame - 5)
@R13
D=M
@5
A=D-A
D=M
@R14
M=D

// *ARG = pop()
@SP
AM=M-1
D=M
@ARG
A=M
M=D

// SP = ARG+1
@ARG
D=M+1
@SP
M=D

// THAT = *(frame-1)
@R13
A=M-1
D=M
@THAT
M=D

// THIS = *(frame-2)
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D

// ARG = *(frame-3)
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D

// LCL = *(frame-4)
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D

// goto retAddr
@R14
A=M
0;JMP
// label IF_FALSE
(IF_FALSE)
// push argument 0
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 2
@2
D=A
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP 
AM=M-1 
D=M 
@SP 
AM=M-1 
D=M-D
@SP
A=M
M=D
@SP
M=M+1
// call Main.fibonacci 1
@Main.fibonacci.return2
D=A
@SP
A=M
M=D
@SP
M=M+1

// push LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// push ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1

// ARG = SP - 5 - nArgs
@SP
D=M
@1
D=D-A
@5
D=D-A
@ARG
M=D

// LCL = SP
@SP
D=M
@LCL
M=D

// go to
@Main.fibonacci
0;JMP
(Main.fibonacci.return2)
// push argument 0
@0
D=A
@ARG
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant 1
@1
D=A
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP 
AM=M-1 
D=M 
@SP 
AM=M-1 
D=M-D
@SP
A=M
M=D
@SP
M=M+1
// call Main.fibonacci 1
@Main.fibonacci.return3
D=A
@SP
A=M
M=D
@SP
M=M+1

// push LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// push ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1

// ARG = SP - 5 - nArgs
@SP
D=M
@1
D=D-A
@5
D=D-A
@ARG
M=D

// LCL = SP
@SP
D=M
@LCL
M=D

// go to
@Main.fibonacci
0;JMP
(Main.fibonacci.return3)
// add
@SP 
AM=M-1 
D=M 
@SP 
AM=M-1 
D=M+D
@SP
A=M
M=D
@SP
M=M+1

// return
// R13: frame = LCL
@LCL
D=M
@R13
M=D

// R14: return address = *(frame - 5)
@R13
D=M
@5
A=D-A
D=M
@R14
M=D

// *ARG = pop()
@SP
AM=M-1
D=M
@ARG
A=M
M=D

// SP = ARG+1
@ARG
D=M+1
@SP
M=D

// THAT = *(frame-1)
@R13
A=M-1
D=M
@THAT
M=D

// THIS = *(frame-2)
@2
D=A
@R13
A=M-D
D=M
@THIS
M=D

// ARG = *(frame-3)
@3
D=A
@R13
A=M-D
D=M
@ARG
M=D

// LCL = *(frame-4)
@4
D=A
@R13
A=M-D
D=M
@LCL
M=D

// goto retAddr
@R14
A=M
0;JMP
// function Sys.init 0
(Sys.init)
// push constant 4
@4
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Main.fibonacci 1
@Sys.init.return4
D=A
@SP
A=M
M=D
@SP
M=M+1

// push LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// push ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1

// push THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1

// ARG = SP - 5 - nArgs
@SP
D=M
@1
D=D-A
@5
D=D-A
@ARG
M=D

// LCL = SP
@SP
D=M
@LCL
M=D

// go to
@Main.fibonacci
0;JMP
(Sys.init.return4)
// label WHILE
(WHILE)
// goto WHILE
@WHILE
0;JMP
// closing loop
    (END)
    @END
    0;JMP