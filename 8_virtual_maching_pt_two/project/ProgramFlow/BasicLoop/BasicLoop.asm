// push constant 0
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 0
@LCL
D=M
@0
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
// label LOOP_START
(LOOP_START)
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
// pop local 0
@LCL
D=M
@0
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
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
// pop argument 0
@ARG
D=M
@0
D=D+A 
@SP
AM=M-1
A=M 
D=D+A 
A=D-A 
D=D-A 
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
// if LOOP_START
@SP
AM=M-1
D=M
@LOOP_START
D;JNE
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
// closing loop
    (END)
    @END
    0;JMP