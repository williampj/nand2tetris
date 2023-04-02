import { readFileSync } from 'fs';
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES["KEYWORD"] = "KEYWORD";
    TOKEN_TYPES["IDENTIFIER"] = "IDENTIFIER";
    TOKEN_TYPES["INT_CONST"] = "INT_CONST";
    TOKEN_TYPES["STRING_CONST"] = "STRING_CONST";
    TOKEN_TYPES["SYMBOL"] = "SYMBOL";
})(TOKEN_TYPES || (TOKEN_TYPES = {}));
;
class JackTokenizer {
    static splitIntoTokens(file) {
        const fileLength = file.length;
        const tokens = [];
        let currentToken;
        let i = 0;
        while (i < fileLength) {
            currentToken = file[i];
            if (currentToken.startsWith('"')) { // string
                let currentString = currentToken;
                while (!currentString.endsWith('"')) { // while loop reunites split strings
                    i += 1;
                    currentToken = file[i];
                    currentString += ` ${currentToken}`;
                }
                tokens.push({
                    tokenType: TOKEN_TYPES.STRING_CONST,
                    stringVal: currentString.slice(1, currentString.length - 1), // removes double quotes
                });
            }
            else if (/^(\-)?[0-9][0-9]*$/.test(currentToken)) { // integer
                tokens.push({ tokenType: TOKEN_TYPES.INT_CONST, intVal: currentToken });
            }
            else if (JackTokenizer.KEYWORDS.includes(currentToken)) { // keyword
                tokens.push({ tokenType: TOKEN_TYPES.KEYWORD, keyWord: currentToken });
            }
            else if (JackTokenizer.SYMBOLS.includes(currentToken)) { // symbol
                tokens.push({ tokenType: TOKEN_TYPES.SYMBOL, symbol: currentToken });
            }
            else if (/^[a-z_][a-z0-9_]*/i.test(currentToken)) { // identifier
                tokens.push({ tokenType: TOKEN_TYPES.IDENTIFIER, identifier: currentToken });
            }
            i += 1;
        }
        return tokens;
    }
    static removeCommentsAndSeparateSymbols(file) {
        const twoForwardSlashComments = /(\/\/.*(\n)*)?/g;
        const forwardSlashStarComments = /(\/\*{1,2}(.|\n|\r)*?(\*\/))/g;
        const lineBreakAndTabChars = /([\n\r\t]*)/g;
        const symbolSeparator = /([~;[\](){}.,])/g;
        const withoutComments = file.replace(twoForwardSlashComments, '')
            .replace(forwardSlashStarComments, '')
            .replace(lineBreakAndTabChars, '')
            .replace(symbolSeparator, ' $1 '); // separates semi-colon, commas, brackets, parentheses, curly braces and periods from surrounding tokens
        return withoutComments.split(' ').filter((token) => !!token);
    }
    constructor(inputFilePath) {
        this.currentToken = () => this.tokens[this.currentTokenNumber];
        this.hasMoreTokens = () => (this.currentTokenNumber + 1) < this.tokens.length;
        this.identifier = () => String(this.currentToken().identifier);
        this.intVal = () => String(this.currentToken().intVal);
        this.keyword = () => String(this.currentToken().keyWord);
        this.symbol = () => String(this.currentToken().symbol);
        this.stringVal = () => String(this.currentToken().stringVal);
        this.tokenType = () => String(this.currentToken().tokenType);
        const file = readFileSync(inputFilePath).toString();
        const parsedFile = JackTokenizer.removeCommentsAndSeparateSymbols(file);
        this.tokens = JackTokenizer.splitIntoTokens(parsedFile);
        this.currentTokenNumber = 0;
    }
    advance() {
        this.currentTokenNumber += 1;
    }
    nextToken() {
        const nextNumber = this.currentTokenNumber + 1;
        return this.tokens[nextNumber];
    }
    getTokenNumber(num) {
        return this.tokens[num];
    }
    getCurrentTokenNumber() {
        return this.currentTokenNumber;
    }
    getTokenValue(num) {
        const token = this.tokens[num];
        const tokenType = token.tokenType;
        if (tokenType === 'IDENTIFIER') {
            return String(token.identifier);
        }
        else if (tokenType === 'KEYWORD') {
            return String(token.keyWord);
        }
        else if (tokenType === 'SYMBOL') {
            return String(token.symbol);
        }
        else if (tokenType === 'INT_CONST') {
            return String(token.intVal);
        }
        else {
            return String(token.stringVal);
        }
    }
    /* Returns the string value of the current token */
    getCurrentTokenValue() {
        const tokenType = this.tokenType();
        if (tokenType === 'IDENTIFIER') {
            return this.identifier();
        }
        else if (tokenType === 'KEYWORD') {
            return this.keyword();
        }
        else if (tokenType === 'SYMBOL') {
            return this.symbol();
        }
        else if (tokenType === 'INT_CONST') {
            return this.intVal();
        }
        else {
            return this.stringVal(); // STRING_CONST
        }
    }
    previousToken() {
        const previousNumber = this.currentTokenNumber - 1;
        return this.tokens[previousNumber];
    }
}
JackTokenizer.KEYWORDS = [
    'class', 'constructor', 'function',
    'method', 'field', 'static', 'var',
    'int', 'char', 'boolean', 'void',
    'true', 'false', 'null', 'this',
    'let', 'do', 'if', 'else', 'while',
    'return',
];
JackTokenizer.SYMBOLS = [
    '{', '}', '(', ')', '[', ']', '.', ',', ';', '+',
    '-', '*', '/', '&', '|', '<', '>', '=', '~',
];
export default JackTokenizer;
