// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.
// Addition/subtraction with loop (R0 = 3, R1 = 10)
// set i to zero (3)
// set sum to zero (30)
// while i is not greater than or equal to R0 
  // set sum to sum + R1 
  // increment i 
// set R2 to sum 

// Example of R0=6, R1=7, R2=42
@6 
D=A
@R0
M=D
@7
D=A 
@R1 
M=D 
@i
M=0 
@sum 
M=0 

(LOOP)
  // loop condition: i <= R0 
  @i 
  D=M 
  @R0
  D=D-M 
  @STOP
  D;JGE
  // increment i and add R1 to sum 
  @sum
  D=M 
  @R1
  D=D+M 
  @sum
  M=D 
  @i 
  M=M+1
  // restart the loop 
  @LOOP 
  0;JMP

(STOP)
  // R2 = sum 
  @sum 
  D=M 
  @R2 
  M=D

(END)
  @END 
  0;JMP 

