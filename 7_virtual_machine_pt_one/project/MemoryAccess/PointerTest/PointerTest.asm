// initializing @SP to 256
@256
D=A
@SP
M=D
// initializing @LCL to 300
@300
D=A
@LCL
M=D
// initializing @ARG to 400
@400
D=A
@ARG
M=D
// initializing @THIS to 3000
@3000
D=A
@THIS
M=D
// initializing @THAT to 3010 
@3010
D=A
@THAT
M=D
// push constant 3030
@3030
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 0
@SP
M=M-1
A=M
D=M
@THIS
M=D
// push constant 3040
@3040
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop pointer 1
@SP
M=M-1
A=M
D=M
@THAT
M=D
// push constant 32
@32
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop this 2
@THIS
A=M
D=A
@2
D=D+A 
@SP
M=M-1
A=M
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
// push constant 46
@46
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop that 6
@THAT
A=M
D=A
@6
D=D+A 
@SP
M=M-1
A=M
A=M 
D=D+A 
A=D-A 
D=D-A 
M=D
// push pointer 0
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
// push pointer 1
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP 
M=M-1 
A=M 
D=M 
@SP 
M=M-1 
A=M
D=M+D
@SP
A=M
M=D
@SP
M=M+1
// push this 2
@2
D=A
@THIS
A=M
A=A+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP 
M=M-1 
A=M 
D=M 
@SP 
M=M-1 
A=M
D=M-D
@SP
A=M
M=D
@SP
M=M+1
// push that 6
@6
D=A
@THAT
A=M
A=A+D
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP 
M=M-1 
A=M 
D=M 
@SP 
M=M-1 
A=M
D=M+D
@SP
A=M
M=D
@SP
M=M+1
