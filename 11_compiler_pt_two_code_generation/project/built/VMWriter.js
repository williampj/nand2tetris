export default class VMWriter {
    constructor(writeStream) {
        this.writeStream = writeStream;
    }
    /* Writes a VM push command */
    writePush(pushObject) {
        const { segment, number } = pushObject;
        if (segment && typeof number === 'number') {
            this.writeStream.write(`push ${segment} ${number}\n`);
        }
        else if (typeof number === 'number') {
            this.writeStream.write(`push ${number}\n`);
        }
        else {
            this.writeStream.write(`push ${segment}\n`);
        }
    }
    /* Writes a VM pop command */
    writePop(popObject) {
        const { segment, number } = popObject;
        this.writeStream.write(`pop ${segment} ${number}\n`);
    }
    /* Writes a VM arithmetic-logical command */
    writeArithmetic(command) {
        this.writeStream.write(`${command}\n`);
    }
    /* Writes a VM label command */
    writeLabel(label) {
        this.writeStream.write(`label ${label}\n`);
    }
    /* Writes a VM goto command */
    writeGoTo(label) {
        this.writeStream.write(`goto ${label}\n`);
    }
    /* Writes a VM if-goto command */
    writeIf(label) {
        this.writeStream.write(`if-goto ${label}\n`);
    }
    /* Writes a VM call command */
    writeCall(callObject) {
        this.writeStream.write(`call ${callObject.segment} ${callObject.number}\n`);
    }
    /* Writes a VM function command */
    writeFunction(name, nArgs) {
        this.writeStream.write(`function ${name} ${nArgs}\n`);
    }
    /* Writes a VM return command */
    writeReturn() {
        this.writeStream.write(`return\n`);
    }
    /* Closes the output file / stream */
    close() {
        this.writeStream.close();
    }
}
