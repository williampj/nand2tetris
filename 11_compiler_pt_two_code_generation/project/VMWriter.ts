import { WriteStream } from "fs";
type SegmentNumber = {
  segment?: string, 
  number?: number
}

export default class VMWriter {
  private writeStream;
  
  constructor(writeStream: WriteStream) {
    this.writeStream = writeStream;
  }

  /* Writes a VM push command */
  writePush(pushObject: SegmentNumber): void {
    const { segment, number } = pushObject;
    
    if (segment && typeof number === 'number') {
      this.writeStream.write(`push ${segment} ${number}\n`)
    } else if (typeof number === 'number') {
      this.writeStream.write(`push ${number}\n`)
    } else {
      this.writeStream.write(`push ${segment}\n`)
    }
  }

  /* Writes a VM pop command */
  writePop(popObject: SegmentNumber): void {
    const { segment, number } = popObject;
    
    this.writeStream.write(`pop ${segment} ${number}\n`)
  }

  /* Writes a VM arithmetic-logical command */
  writeArithmetic(command: string): void {
    this.writeStream.write(`${command}\n`)
  }

  /* Writes a VM label command */
  writeLabel(label: string): void {
    this.writeStream.write(`label ${label}\n`)
  }

  /* Writes a VM goto command */
  writeGoTo(label: string): void {
    this.writeStream.write(`goto ${label}\n`)
  }

  /* Writes a VM if-goto command */
  writeIf(label: string): void {
    this.writeStream.write(`if-goto ${label}\n`)
  }

  /* Writes a VM call command */
  writeCall(callObject: SegmentNumber): void {
    this.writeStream.write(`call ${callObject.segment} ${callObject.number}\n`)
  }

  /* Writes a VM function command */
  writeFunction( name: string, nArgs: number ): void {
    this.writeStream.write(`function ${name} ${nArgs}\n`)
  }

  /* Writes a VM return command */
  writeReturn(): void {
    this.writeStream.write(`return\n`)
  }

  /* Closes the output file / stream */
  close(): void {
    this.writeStream.close();
  }
}
