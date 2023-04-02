import { lstat } from "fs";
class CompilationEngine {
    /* Determines compilation logic based on token type. */
    compileToken(symbolInfo) {
        const tokenType = this.tokenizer.tokenType();
        let symbol = this.tokenizer.symbol();
        const keyword = this.tokenizer.keyword();
        const identifier = this.tokenizer.identifier();
        switch (tokenType) {
            case 'KEYWORD':
                this.compileLookup[keyword]();
                break;
            case 'IDENTIFIER':
                if (symbolInfo) {
                    const category = CompilationEngine.CATEGORY_CONVERTER[symbolInfo.category];
                    this.vmWriter.writePush({ segment: category, number: symbolInfo.index });
                }
                break;
            case 'INT_CONST':
                let value = Number(this.tokenizer.intVal());
                if (value >= 0) {
                    this.vmWriter.writePush({ segment: 'constant', number: value });
                }
                else {
                    value = value * -1;
                    this.vmWriter.writePush({ segment: 'constant', number: value });
                    this.vmWriter.writeArithmetic('neg');
                }
                break;
            case 'STRING_CONST':
                this.compileString();
                break;
            case 'SYMBOL':
                const operator = CompilationEngine.OPERATOR_CONVERTER[symbol];
                if (operator) {
                    this.vmWriter.writeArithmetic(operator);
                }
                break;
            default:
                throw new Error('Could not determine token type');
        }
    }
    /* Advances the tokenizer and compiles the next token. */
    compileNextToken() {
        this.tokenizer.advance();
        this.compileToken();
    }
    /* Compiles the subroutine call */
    compileSubroutineCall() {
        let className;
        let identifier = this.getCurrentTokenValue();
        const functionOrConstructor = identifier[0] === identifier[0].toUpperCase();
        let subroutineName;
        this.tokenizer.advance();
        const separator = this.getCurrentTokenValue(); // '(' || '.'
        if (separator === '(') { // function call
            subroutineName = identifier;
            identifier = 'this';
            className = this.classIdentifier;
            this.tokenizer.advance();
        }
        else { // '.' // method or constructor call
            this.tokenizer.advance();
            subroutineName = this.getCurrentTokenValue();
            if (this.methodSymbolTable.typeOf(identifier) !== 'NONE') {
                className = this.methodSymbolTable.typeOf(identifier);
            }
            else if (this.classSymbolTable.typeOf(identifier) !== 'NONE') {
                className = this.classSymbolTable.typeOf(identifier);
            }
            else {
                className = identifier;
            }
            this.tokenizer.advance(); // '('
            this.tokenizer.advance();
        }
        if (!functionOrConstructor) {
            let segment;
            let number;
            if (identifier === 'this') {
                segment = 'pointer';
                number = 0;
            }
            else {
                const kind = this.methodSymbolTable.kindOf(identifier);
                segment = CompilationEngine.CATEGORY_CONVERTER[kind];
                number = this.methodSymbolTable.indexOf(identifier);
            }
            this.vmWriter.writePush({ segment, number });
        }
        let expressionCount = this.compileExpressionList();
        if (!functionOrConstructor) {
            expressionCount += 1; // adds 'this' argument to method calls
        }
        this.vmWriter.writeCall({ segment: `${className}.${subroutineName}`, number: expressionCount });
    }
    compileNullFalse() {
        this.vmWriter.writePush({ segment: 'constant', number: 0 });
    }
    compileThis() {
        this.vmWriter.writePush({ segment: 'pointer', number: 0 });
    }
    compileTrue() {
        this.vmWriter.writePush({ segment: 'constant', number: 1 });
        this.vmWriter.writeArithmetic('neg');
    }
    compileString() {
        const stringVal = this.tokenizer.stringVal();
        const stringLength = stringVal.length;
        this.vmWriter.writePush({ segment: 'constant', number: stringLength });
        this.vmWriter.writeCall({ segment: 'String.new', number: 1 });
        for (let i = 0; i < stringLength; i += 1) {
            const charCode = stringVal.charCodeAt(i);
            this.vmWriter.writePush({ segment: 'constant', number: charCode });
            this.vmWriter.writeCall({ segment: 'String.appendChar', number: 2 });
        }
    }
    /* Wraps expression in parentheses or brackets and compiles its contents. */
    wrapExpression() {
        this.tokenizer.advance();
        this.compileExpression();
    }
    /* Wraps statement in curly braces and compiles its contents. */
    wrapStatements() {
        this.tokenizer.advance(); // '{'
        this.tokenizer.advance();
        this.compileStatements();
    }
    /* Returns the string value of the current token */
    getCurrentTokenValue() {
        const tokenType = this.tokenizer.tokenType();
        if (tokenType === 'IDENTIFIER') {
            return this.tokenizer.identifier();
        }
        else if (tokenType === 'KEYWORD') {
            return this.tokenizer.keyword();
        }
        else if (tokenType === 'SYMBOL') {
            return this.tokenizer.symbol();
        }
        else if (tokenType === 'INT_CONST') {
            return this.tokenizer.intVal();
        }
        else {
            return this.tokenizer.stringVal(); // STRING_CONST
        }
    }
    getVarCount() {
        let count = 0;
        let currentTokenNum = this.tokenizer.getCurrentTokenNumber();
        let currentValue = this.tokenizer.getTokenValue(currentTokenNum);
        while (currentValue !== '{') {
            currentTokenNum += 1;
            currentValue = this.tokenizer.getTokenValue(currentTokenNum);
        }
        currentTokenNum += 1;
        currentValue = this.tokenizer.getTokenValue(currentTokenNum); // 'var' if there are local variables
        while (currentValue === 'var') {
            let commas = 0;
            while (currentValue !== ';') {
                currentTokenNum += 1;
                currentValue = this.tokenizer.getTokenValue(currentTokenNum);
                if (currentValue === ',') {
                    commas += 1;
                }
            }
            count += commas + 1;
            currentTokenNum += 1;
            currentValue = this.tokenizer.getTokenValue(currentTokenNum);
        }
        return count;
    }
    constructor(tokenizer, methodSymbolTable, classSymbolTable, VMWriter) {
        /* Calls the compilation method assigned to the given token. */
        this.compileLookup = {
            boolean: () => this.compileKeyword(),
            class: () => this.compileKeyword(),
            char: () => this.compileKeyword(),
            constructor: () => this.compileSubroutine(),
            do: () => this.compileDo(),
            false: () => this.compileNullFalse(),
            field: () => this.compileClassVarDec(),
            function: () => this.compileSubroutine(),
            else: () => this.compileKeyword(),
            if: () => this.compileIf(),
            int: () => this.compileKeyword(),
            method: () => this.compileSubroutine(),
            null: () => this.compileNullFalse(),
            let: () => this.compileLet(),
            return: () => this.compileReturn(),
            static: () => this.compileClassVarDec(),
            this: () => this.compileThis(),
            true: () => this.compileTrue(),
            while: () => this.compileWhile(),
            var: () => this.compileVarDec(),
            void: () => this.compileKeyword(),
        };
        this.tokenizer = tokenizer;
        this.methodSymbolTable = methodSymbolTable;
        this.classSymbolTable = classSymbolTable;
        this.vmWriter = VMWriter;
        this.subRoutineReturnType = '';
        this.classIdentifier = '';
        this.ifLabelIndex = 0;
        this.whileLabelIndex = 0;
        this.numberOfFields = 0;
    }
    /* First method to run.
     * It compiles a complete class, which wraps all other tokens compilations.
    */
    compileClass() {
        this.tokenizer.advance();
        this.classIdentifier = this.getCurrentTokenValue();
        while (this.tokenizer.hasMoreTokens()) {
            this.compileNextToken();
        }
    }
    /* Compiles the keywords: class, int, void, boolean, else, null. */
    compileKeyword() {
    }
    /* Compiles a static variable declaration or a field declaration. */
    compileClassVarDec() {
        const kind = this.getCurrentTokenValue().toUpperCase(); // 'field' / 'static'
        this.tokenizer.advance();
        const type = this.getCurrentTokenValue(); // int, bool, char, Array, className 
        this.tokenizer.advance();
        while (this.tokenizer.symbol() !== ';') {
            const tokenValue = this.getCurrentTokenValue(); // identifier or ,
            if (tokenValue !== ',') {
                if (kind === 'FIELD') {
                    this.numberOfFields += 1;
                    // Adds class variable to method symbol-table
                    this.methodSymbolTable.define({ name: tokenValue, type, kind });
                }
                else { // kind === 'STATIC'
                    this.classSymbolTable.define({ name: tokenValue, type, kind });
                }
            }
            this.tokenizer.advance();
        }
    }
    /* Compiles var (local variable) declaration. */
    compileVarDec() {
        const kind = this.getCurrentTokenValue().toUpperCase(); // 'var''
        this.tokenizer.advance();
        const type = this.getCurrentTokenValue(); // int, bool, char, Array, className 
        this.compileToken();
        this.tokenizer.advance();
        while (this.tokenizer.symbol() !== ';') {
            const tokenValue = this.getCurrentTokenValue(); // identifier or ,
            if (tokenValue !== ',') {
                // Adds variable to method symbol-table
                this.methodSymbolTable.define({ name: tokenValue, type, kind });
            }
            this.tokenizer.advance(); // ';'
        }
    }
    /* Compiles a complete method, function or constructor. */
    compileSubroutine() {
        this.methodSymbolTable.reset(); // resets method symbol table for a new subroutine
        const subroutineType = this.tokenizer.keyword(); // (constructor|method|function)
        if (subroutineType === 'method') {
            this.methodSymbolTable.define({
                name: 'this',
                kind: 'ARG',
                type: this.classIdentifier
            });
        }
        this.tokenizer.advance();
        this.subRoutineReturnType = this.getCurrentTokenValue(); // void | type identifier
        this.tokenizer.advance();
        const subroutineName = this.getCurrentTokenValue();
        this.tokenizer.advance(); // '('
        const varCount = this.getVarCount();
        const functionName = `${this.classIdentifier}.${subroutineName}`;
        this.vmWriter.writeFunction(functionName, varCount);
        if (subroutineType === 'constructor') {
            this.vmWriter.writePush({ segment: 'constant', number: this.numberOfFields });
            this.vmWriter.writeCall({ segment: 'Memory.alloc', number: 1 });
            this.vmWriter.writePop({ segment: 'pointer', number: 0 });
        }
        else if (subroutineType === 'method') {
            this.vmWriter.writePush({ segment: 'argument', number: 0 });
            this.vmWriter.writePop({ segment: 'pointer', number: 0 });
        }
        this.tokenizer.advance(); // ')'
        this.compileParameterList();
        this.tokenizer.advance(); // '{' to begin subroutine body
        this.compileSubroutineBody();
        this.subRoutineReturnType = ''; // resetting subroutineReturnType
    }
    /* Compiles let statements. */
    compileLet() {
        this.tokenizer.advance(); // 'identifier name'
        const name = this.tokenizer.identifier();
        let category = this.methodSymbolTable.kindOf(name);
        if (category === 'NONE') {
            category = this.classSymbolTable.kindOf(name);
        }
        ;
        category = CompilationEngine.CATEGORY_CONVERTER[category];
        let index = this.methodSymbolTable.indexOf(name);
        if (typeof index !== 'number') {
            index = this.classSymbolTable.indexOf(name);
        }
        ;
        this.tokenizer.advance();
        if (this.tokenizer.symbol() === '[') {
            // pushes array base address to stack
            this.vmWriter.writePush({ segment: category, number: index });
            this.wrapExpression(); // [ expression ]
            // pushes array element address to be at the top of the stack
            this.vmWriter.writeArithmetic('add');
            this.tokenizer.advance(); // '='
            this.tokenizer.advance();
            this.compileExpression();
            this.vmWriter.writePop({ segment: 'temp', number: 0 });
            this.vmWriter.writePop({ segment: 'pointer', number: 1 });
            this.vmWriter.writePush({ segment: 'temp', number: 0 });
            this.vmWriter.writePop({ segment: 'that', number: 0 });
            if (this.tokenizer.symbol() !== ';') {
                this.tokenizer.advance();
            }
        }
        else {
            this.tokenizer.advance();
            this.compileExpression();
            if (this.tokenizer.symbol() !== ';') {
                this.tokenizer.advance();
            }
            this.vmWriter.writePop({ segment: category, number: index });
        }
    }
    /* Compiles an if statement, possibly with a trailing else clause. */
    compileIf() {
        const currentIfScope = this.ifLabelIndex;
        this.ifLabelIndex += 1;
        this.tokenizer.advance(); // advances tokenizer to '('
        this.wrapExpression(); // ( expression )
        this.vmWriter.writeArithmetic('not');
        this.vmWriter.writeIf(`ELSE_${currentIfScope}`);
        this.wrapStatements(); // { statements }
        if (this.tokenizer.nextToken()?.keyWord === 'else') {
            this.vmWriter.writeGoTo(`END_IF_${currentIfScope}`);
            this.vmWriter.writeLabel(`ELSE_${currentIfScope}`);
            this.tokenizer.advance();
            this.wrapStatements(); // { statements }
            this.vmWriter.writeLabel(`END_IF_${currentIfScope}`);
        }
        else {
            this.vmWriter.writeLabel(`ELSE_${currentIfScope}`);
        }
    }
    /* Compiles a do statement. */
    compileDo() {
        this.tokenizer.advance();
        this.compileSubroutineCall();
        this.vmWriter.writePop({ segment: 'temp', number: 0 });
        this.tokenizer.advance(); // ';'
    }
    /* Compiles a while statements. */
    compileWhile() {
        const currentWhileScope = this.whileLabelIndex;
        this.whileLabelIndex += 1;
        this.tokenizer.advance(); // sets token to '('
        this.vmWriter.writeLabel(`WHILE_${currentWhileScope}`);
        this.wrapExpression(); // ( expression )
        this.vmWriter.writeArithmetic('not');
        this.vmWriter.writeIf(`END_WHILE_${currentWhileScope}`);
        this.wrapStatements(); // { statements }
        this.vmWriter.writeGoTo(`WHILE_${currentWhileScope}`);
        this.vmWriter.writeLabel(`END_WHILE_${currentWhileScope}`);
    }
    /* Compiles a return statements. */
    compileReturn() {
        this.tokenizer.advance();
        if (this.tokenizer.symbol() !== ';') {
            this.compileExpression();
        }
        if (this.subRoutineReturnType === 'void') {
            this.vmWriter.writePush({ segment: 'constant', number: 0 });
        }
        this.vmWriter.writeReturn();
    }
    /* Compiles a (possibly empty) parameter list. */
    compileParameterList() {
        let type;
        while (this.tokenizer.symbol() !== ')') {
            const tokenValue = this.getCurrentTokenValue(); // identifier or ,
            if (tokenValue !== ',' && !type) {
                type = tokenValue;
            }
            else if (tokenValue !== ',' && type) {
                // Add variable to method symbol-table
                this.methodSymbolTable.define({ name: tokenValue, type, kind: 'ARG' });
                type = undefined;
            }
            this.tokenizer.advance();
        }
    }
    /* Compiles a subroutine's body. */
    compileSubroutineBody() {
        this.tokenizer.advance(); // from '{' to subroutine body
        while (this.tokenizer.keyword() === 'var') {
            this.compileVarDec();
            this.tokenizer.advance();
        }
        this.compileStatements();
    }
    /* Compiles a sequence of statements. */
    compileStatements() {
        while (this.tokenizer.symbol() !== '}') {
            this.compileToken();
            if (this.tokenizer.hasMoreTokens()) {
                this.tokenizer.advance();
            }
        }
    }
    /* Compiles an expression. */
    compileExpression() {
        let operator;
        let notOperator = false;
        if (this.tokenizer.symbol() === '~') {
            notOperator = true;
            this.tokenizer.advance();
        }
        this.compileTerm();
        this.tokenizer.advance();
        if (CompilationEngine.OPERATORS.includes(this.tokenizer.symbol())) {
            operator = this.getCurrentTokenValue(); // '+', '-', '*', '/', '&', '|', '<', '>', '='
            this.tokenizer.advance();
            this.compileTerm();
            this.tokenizer.advance();
            if (operator === '*') {
                this.vmWriter.writeCall({ segment: 'Math.multiply', number: 2 });
            }
            else if (operator === '/') {
                this.vmWriter.writeCall({ segment: 'Math.divide', number: 2 });
            }
            else {
                const writtenOperator = CompilationEngine.OPERATOR_CONVERTER[operator];
                this.vmWriter.writeArithmetic(writtenOperator);
            }
        }
        if (notOperator) {
            this.vmWriter.writeArithmetic('not');
            notOperator = false;
        }
    }
    /* Compiles a term.
     * If the current token is an identifier, the routine must resolve to a variable,
     * array element, or subroutine call.
     */
    compileTerm() {
        const tokenType = this.tokenizer.tokenType();
        const currentSymbol = this.tokenizer.symbol();
        const nextSymbol = String(this.tokenizer.nextToken()?.symbol);
        const currentKeyword = this.tokenizer.keyword();
        const identifierValue = this.tokenizer.identifier();
        if (['STRING_CONST', 'INT_CONST'].includes(tokenType)) {
            this.compileToken();
        }
        else if (['true', 'false', 'null', 'this'].includes(currentKeyword)) {
            this.compileToken();
        }
        else if (tokenType === 'IDENTIFIER') {
            let category = this.methodSymbolTable.kindOf(identifierValue);
            let index;
            if (category === 'NONE') {
                category = this.classSymbolTable.kindOf(identifierValue);
                index = this.classSymbolTable.indexOf(identifierValue);
            }
            else {
                index = this.methodSymbolTable.indexOf(identifierValue);
            }
            if (nextSymbol === '[') {
                this.compileToken({ category, index }); // varName
                this.tokenizer.advance(); // sets tokenizer to '['
                this.wrapExpression(); // [ expression ]
                this.vmWriter.writeArithmetic('add');
                this.vmWriter.writePop({ segment: 'pointer', number: 1 });
                this.vmWriter.writePush({ segment: 'that', number: 0 });
            }
            else if (['(', '.'].includes(nextSymbol)) {
                this.compileSubroutineCall();
            }
            else { // identifier name
                const symbol = { category, index };
                this.compileToken(symbol); // varName
            }
        }
        else if (tokenType === 'SYMBOL' && currentSymbol === '(') {
            this.wrapExpression(); // ( expression )
        }
        else if (tokenType === 'SYMBOL' && '-' === currentSymbol) {
            this.compileToken(); // '~' or '-'
            this.tokenizer.advance();
            lstat;
            this.compileTerm();
        }
    }
    /* Compiles (possibly empty) comma-separated list of expressions.
     * Returns the number of expressions in the list.
     */
    compileExpressionList() {
        let count = 0;
        if (this.tokenizer.symbol() !== ')') {
            count += 1;
            this.compileExpression();
            while (this.tokenizer.symbol() === ',') {
                this.tokenizer.advance();
                this.compileExpression();
                count += 1;
            }
        }
        return count;
    }
}
CompilationEngine.OPERATORS = [
    '+', '-', '*', '/', '&', '|', '<', '>', '=',
];
CompilationEngine.OPERATOR_CONVERTER = {
    '+': 'add',
    '-': 'sub',
    '&': 'and',
    '|': 'or',
    '~': 'not',
    '<': 'lt',
    '>': 'gt',
    '=': 'eq'
};
CompilationEngine.CATEGORY_CONVERTER = {
    'FIELD': 'this',
    'STATIC': 'static',
    'VAR': 'local',
    'ARG': 'argument'
};
export default CompilationEngine;
