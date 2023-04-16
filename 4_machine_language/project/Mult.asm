// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// PSEUDOCODE
// set i to zero
// set R2 (product) to zero
// while i is not greater than or equal to R0 
  // set R2 to R2 + R1 
  // increment i 
@i
M=0 
@R2  
M=0 

(LOOP)
  // loop condition: i <= R0 
  @i 
  D=M 
  @R0
  D=D-M 
  @END
  D;JGE
  // increment i and add R1 to sum 
  @R1 
  D=M 
  @R2
  M=M+D
  @i 
  M=M+1
  // restart the loop 
  @LOOP 
  0;JMP
(END)
  @END 
  0;JMP 

