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
// function Sys.init 0
(Sys.init)
// push constant 4000
@4000
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 0
@SP
AM=M-1
D=M
@THIS
M=D
// push constant 5000
@5000
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 1
@SP
AM=M-1
D=M
@THAT
M=D
// call Sys.main 0
@Sys.init.return2
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
@Sys.main
0;JMP
(Sys.init.return2)
// pop temp 1
@SP
AM=M-1
D=M
@6
M=D
// label LOOP
(LOOP)
// goto LOOP
@LOOP
0;JMP
// function Sys.main 5
(Sys.main)
@0
D=A
@LCL
A=M+D
M=0
@SP
M=M+1
@1
D=A
@LCL
A=M+D
M=0
@SP
M=M+1
@2
D=A
@LCL
A=M+D
M=0
@SP
M=M+1
@3
D=A
@LCL
A=M+D
M=0
@SP
M=M+1
@4
D=A
@LCL
A=M+D
M=0
@SP
M=M+1
// push constant 4001
@4001
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 0
@SP
AM=M-1
D=M
@THIS
M=D
// push constant 5001
@5001
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 1
@SP
AM=M-1
D=M
@THAT
M=D
// push constant 200
@200
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 1
@LCL
D=M
@1
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
// push constant 40
@40
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 2
@LCL
D=M
@2
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
// push constant 6
@6
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 3
@LCL
D=M
@3
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
// push constant 123
@123
D=A
@SP
A=M
M=D
@SP
M=M+1
// call Sys.add12 1
@Sys.main.return3
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
@Sys.add12
0;JMP
(Sys.main.return3)
// pop temp 0
@SP
AM=M-1
D=M
@5
M=D
// push local 0
@0
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 1
@1
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 2
@2
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 3
@3
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// push local 4
@4
D=A
@LCL
A=M+D
D=M
@SP
A=M
M=D
@SP
M=M+1
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
// function Sys.add12 0
(Sys.add12)
// push constant 4002
@4002
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 0
@SP
AM=M-1
D=M
@THIS
M=D
// push constant 5002
@5002
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 1
@SP
AM=M-1
D=M
@THAT
M=D
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
// push constant 12
@12
D=A
@SP
A=M
M=D
@SP
M=M+1
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
// closing loop
    (END)
    @END
    0;JMP