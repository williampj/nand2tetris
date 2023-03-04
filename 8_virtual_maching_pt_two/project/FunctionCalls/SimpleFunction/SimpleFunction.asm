// function SimpleFunction.test 2
(SimpleFunction.test)
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
// not
@SP
AM=M-1
M=!M
@SP
M=M+1
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
// push argument 1
@1
D=A
@ARG
A=M+D
D=M
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