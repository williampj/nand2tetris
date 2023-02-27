// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE0
D;JEQ
@FALSE0
0;JMP

(TRUE0)
  @0
  D=A
  @1
  D=D-A
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
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE1
D;JEQ
@FALSE1
0;JMP

(TRUE1)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON1
  0;JMP

(FALSE1)
  @SP
  A=M
  M=0

(END_COMPARISON1)
  @SP
  M=M+1 
// push constant 16
@16
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 17
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE2
D;JEQ
@FALSE2
0;JMP

(TRUE2)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON2
  0;JMP

(FALSE2)
  @SP
  A=M
  M=0

(END_COMPARISON2)
  @SP
  M=M+1 
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE3
D;JLT
@FALSE3
0;JMP

(TRUE3)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON3
  0;JMP

(FALSE3)
  @SP
  A=M
  M=0

(END_COMPARISON3)
  @SP
  M=M+1 
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 892
@892
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE4
D;JLT
@FALSE4
0;JMP

(TRUE4)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON4
  0;JMP

(FALSE4)
  @SP
  A=M
  M=0

(END_COMPARISON4)
  @SP
  M=M+1 
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 891
@891
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE5
D;JLT
@FALSE5
0;JMP

(TRUE5)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON5
  0;JMP

(FALSE5)
  @SP
  A=M
  M=0

(END_COMPARISON5)
  @SP
  M=M+1 
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE6
D;JGT
@FALSE6
0;JMP

(TRUE6)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON6
  0;JMP

(FALSE6)
  @SP
  A=M
  M=0

(END_COMPARISON6)
  @SP
  M=M+1 
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32767
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE7
D;JGT
@FALSE7
0;JMP

(TRUE7)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON7
  0;JMP

(FALSE7)
  @SP
  A=M
  M=0

(END_COMPARISON7)
  @SP
  M=M+1 
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 32766
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1
@SP
AM=M-1
D=M
@SP
AM=M-1
A=M
D=A-D
@TRUE8
D;JGT
@FALSE8
0;JMP

(TRUE8)
  @0
  D=A
  @1
  D=D-A
  @SP
  A=M
  M=D
  @END_COMPARISON8
  0;JMP

(FALSE8)
  @SP
  A=M
  M=0

(END_COMPARISON8)
  @SP
  M=M+1 
// push constant 57
@57
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 31
@31
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 53
@53
D=A
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
// push constant 112
@112
D=A
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
// neg
@SP
M=M-1
A=M
M=-M
@SP
M=M+1
// and
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
A=M
D=A&D
@SP
A=M
M=D
@SP
M=M+1
// push constant 82
@82
D=A
@SP
A=M
M=D
@SP
M=M+1
// or
@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
A=M
D=A|D
@SP
A=M
M=D
@SP
M=M+1
// not
@SP
M=M-1
A=M
D=M
D=!D
M=D
@SP
M=M+1
