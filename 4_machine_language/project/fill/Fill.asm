// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.
// 256 rows x 32 words (8192) that need to be assigned value of -1 (gives 16 ones which means 16 bits/pixels turned black)

// PSEUDOCODE
// Inspect keyboard press (KEYBOARD_INSPECT)
  // if pressed, proceed to @BLACKEN_SCREEN 
  // else, proceed to @WHITEN_SCREEN 
// (BLACKEN_SCREEN)  
  // set endpoint to 8191
  // set starting n to 0 
  // Loop 
    // inspect keyboard, if key not pressed then jump to keyboard inspect part
    // if n is equal to endpoint, skip to end of program
    // set pointer of @SCREEN + n equal to -1 
    // increment n 
    // repeat loop  
// (WHITEN_SCREEN)
  // set endpoint to 8191 
  // set starting n to 0 
  // Loop 
    // inspect keyboard, if key is pressed then jump to keyboard inspect part
    // if n is equal to endpoint, skip to end of program
    // set pointer of @SCREEN + n equal to -1 
    // increment n 
    // repeat loop  

(KEYBOARD_INSPECT)
  @KBD 
  D=M 
  @BLACKEN_SCREEN 
  D;JGT
  @WHITEN_SCREEN
  D;JEQ 

(BLACKEN_SCREEN)
  @8191
  D=A 
  @endpoint
  M=D 
  @pointer 
  M=0
  (LOOP_BLACKEN)
    // Interrupt process if keyboard key no longer pressed 
    @KBD 
    D=M 
    @KEYBOARD_INSPECT
    D;JEQ 
    @pointer
    D=M 
    @endpoint 
    D=D-M 
    @END 
    D;JGE
    @SCREEN
    D=A 
    @pointer 
    A=M+D
    M=-1
    @pointer 
    M=M+1
    @LOOP_BLACKEN
    0;JMP
  
  (WHITEN_SCREEN)
  @8191
  D=A 
  @endpoint
  M=D 
  @pointer 
  M=0
  (LOOP_WHITEN)
    // Interrupt process if keyboard key is pressed 
    @KBD 
    D=M 
    @KEYBOARD_INSPECT
    D;JGT
    @pointer
    D=M 
    @endpoint 
    D=D-M 
    @END 
    D;JGE
    @SCREEN
    D=A
    @pointer 
    A=M+D
    M=0 
    @pointer 
    M=M+1
    @LOOP_WHITEN
    0;JMP

(END)
  @END 
  0;JMP