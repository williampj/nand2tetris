import { readFileSync } from 'fs';

export default class JackTokenizer {
  static #KEYWORDS = [
    'class', 'constructor', 'function',
    'method', 'field', 'static', 'var',
    'int', 'char', 'boolean', 'void',
    'true', 'false', 'null', 'this',
    'let', 'do', 'if', 'else', 'while',
    'return',
  ];

  static #SYMBOLS = [
    '{', '}', '(', ')', '[', ']', '.', ',', ';', '+',
    '-', '*', '/', '&', '|', '<', '>', '=', '~',
  ];

  static #TOKEN_TYPES = {
    KEYWORD: 'KEYWORD',
    IDENTIFIER: 'IDENTIFIER',
    INT_CONST: 'INT_CONST',
    STRING_CONST: 'STRING_CONST',
    SYMBOL: 'SYMBOL',
  };

  static #splitIntoTokens(file) {
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
          tokenType: JackTokenizer.#TOKEN_TYPES.STRING_CONST,
          stringVal: currentString.slice(1, currentString.length - 1), // removes double quotes
        });
      } else if (/^[0-9][0-9]*$/.test(currentToken)) { // integer
        tokens.push({ tokenType: JackTokenizer.#TOKEN_TYPES.INT_CONST, intVal: currentToken });
      } else if (JackTokenizer.#KEYWORDS.includes(currentToken)) { // keyword
        tokens.push({ tokenType: JackTokenizer.#TOKEN_TYPES.KEYWORD, keyWord: currentToken });
      } else if (JackTokenizer.#SYMBOLS.includes(currentToken)) { // symbol
        tokens.push({ tokenType: JackTokenizer.#TOKEN_TYPES.SYMBOL, symbol: currentToken });
      } else if (/^[a-z_][a-z0-9_]*/i.test(currentToken)) { // identifier
        tokens.push({ tokenType: JackTokenizer.#TOKEN_TYPES.IDENTIFIER, identifier: currentToken });
      }
      i += 1;
    }

    return tokens;
  }

  static #removeCommentsAndSeparateSymbols(file) {
    const twoForwardSlashComments = /(\/\/.*(\n)*)?/g;
    const forwardSlashStarComments = /(\/\*{1,2}(.|\n|\r)*?(\*\/))/g;
    const lineBreakAndTabChars = /([\n\r\t]*)/g;
    const symbolSeparator = /([~;[\](){}.,-])/g;

    const withoutComments = file.replaceAll(twoForwardSlashComments, '')
      .replaceAll(forwardSlashStarComments, '')
      .replaceAll(lineBreakAndTabChars, '')
      .replaceAll(symbolSeparator, ' $1 '); // separates semi-colon, commas, brackets, parentheses, curly braces and periods from surrounding tokens

    return withoutComments.split(' ').filter((token) => !!token);
  }

  #tokens;
  #currentTokenNumber;

  constructor(inputFilePath) {
    const file = readFileSync(inputFilePath).toString();
    const parsedFile = JackTokenizer.#removeCommentsAndSeparateSymbols(file);
    this.#tokens = JackTokenizer.#splitIntoTokens(parsedFile);
    this.#currentTokenNumber = 0;
  }

  advance() {
    this.#currentTokenNumber += 1;
  }

  currentToken = () => this.#tokens[this.#currentTokenNumber];

  hasMoreTokens = () => (this.#currentTokenNumber + 1) < this.#tokens.length;

  nextToken() {
    const nextNumber = this.#currentTokenNumber + 1;
    return this.#tokens[nextNumber];
  }

  identifier = () => this.currentToken().identifier;

  intVal = () => this.currentToken().intVal;

  keyword = () => this.currentToken().keyWord;

  symbol = () => this.currentToken().symbol;

  stringVal = () => this.currentToken().stringVal;

  tokenType = () => this.currentToken().tokenType;
}
