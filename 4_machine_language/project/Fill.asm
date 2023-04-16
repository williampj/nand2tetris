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
// SCREEN base address = 16384 (until 24575)  24576 (keyboard)

// PSEUDOCODE
// Inspect keyboard press (KEYBOARD_INSPECT)
  // if pressed, proceed to @BLACKEN_SCREEN 
  // else, proceed to @WHITEN_SCREEN 
// (BLACKEN_SCREEN)  
  // set pointer to SCREEN base address
  // set endpoint to SCREEN base address + 8191 (from 0 .. 8191)
  // Loop 
    // inspect keyboard, if key not pressed then jump to whiten screen
    // jump to blacken screen from base address if pointer exceeds end pointer
    // set pointer's address to -1 
    // increment pointer 
// (WHITEN_SCREEN)
  // set pointer to SCREEN base address
  // set endpoint to SCREEN base address + 8191 (from 0 .. 8191)
  // Loop 
    // inspect keyboard, if key is pressed then jump to blacken screen
    // jump to whiten screen from base address if pointer exceeds end pointer
    // set pointer's address to 0
    // increment pointer
    

(KEYBOARD_INSPECT)
  @KBD 
  D=M 
  @BLACKEN_SCREEN 
  D;JNE
  @WHITEN_SCREEN
  0;JMP

(BLACKEN_SCREEN)
  @SCREEN
  D=A 
  @pointer // sets pointer to Screen base address
  M=D 
  @8191
  D=D+A
  @endpoint 
  M=D // sets endpoint to last address in the screen memory map
  
  (LOOP_BLACKEN)
    // Interrupt process if keyboard key no longer pressed 
    @KBD 
    D=M 
    @WHITEN_SCREEN
    D;JEQ 
    @pointer
    D=M 
    @endpoint 
    D=D-M 
    @BLACKEN_SCREEN // start at base address again
    D;JGT // pointer exceeds endpoint 
    @pointer
    A=M 
    M=-1
    @pointer 
    M=M+1
    @LOOP_BLACKEN
    0;JMP
  
(WHITEN_SCREEN)
  @SCREEN
  D=A 
  @pointer // sets pointer to Screen base address
  M=D 
  @8191
  D=D+A
  @endpoint 
  M=D // sets endpoint to last address in the screen memory map
  
  (LOOP_WHITEN)
    // Interrupt process if keyboard key is pressed 
    @KBD 
    D=M 
    @BLACKEN_SCREEN
    D;JNE
    @pointer
    D=M 
    @endpoint 
    D=D-M 
    @WHITEN_SCREEN // start at base address again
    D;JGT // pointer exceeds endpoint 
    @pointer
    A=M 
    M=0
    @pointer 
    M=M+1
    @LOOP_WHITEN
    0;JMP