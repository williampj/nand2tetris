export default class CompilationEngine {
  static #OPERATORS = [
    '+', '-', '*', '/', '&', '|', '<', '>', '=',
  ];

  static #SYMBOL_CONVERTER = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;',
  };

  #tokenizer;
  #writeStream;

  #compileLookup = {
    boolean: () => this.compileKeyword(),
    class: () => this.compileKeyword(),
    char: () => this.compileKeyword(),
    constructor: () => this.compileSubroutine(),
    do: () => this.compileDo(),
    false: () => this.compileKeyword(),
    field: () => this.compileClassVarDec(),
    function: () => this.compileSubroutine(),
    else: () => this.compileKeyword(),
    if: () => this.compileIf(),
    int: () => this.compileKeyword(),
    method: () => this.compileSubroutine(),
    null: () => this.compileKeyword(),
    let: () => this.compileLet(),
    return: () => this.compileReturn(),
    static: () => this.compileClassVarDec(),
    true: () => this.compileKeyword(),
    while: () => this.compileWhile(),
    var: () => this.compileVarDec(),
    void: () => this.compileKeyword(),
  };

  #compileToken() {
    const tokenType = this.#tokenizer.tokenType();
    let symbol = this.#tokenizer.symbol();

    switch (tokenType) {
      case 'KEYWORD':
        this.#compileLookup[this.#tokenizer.keyword()]();
        break;
      case 'IDENTIFIER':
        this.#writeStream.write(`<identifier> ${this.#tokenizer.identifier()} </identifier>\n`);
        break;
      case 'INT_CONST':
        this.#writeStream.write(`<integerConstant> ${this.#tokenizer.intVal()} </integerConstant>\n`);
        break;
      case 'STRING_CONST':
        this.#writeStream.write(`<stringConstant> ${this.#tokenizer.stringVal()} </stringConstant>\n`);
        break;
      case 'SYMBOL':
        symbol = CompilationEngine.#SYMBOL_CONVERTER[symbol] || symbol; // converts <, ;, &, >
        this.#writeStream.write(`<symbol> ${symbol} </symbol>\n`);
        break;
      default:
        throw new Error('Could not determine token type');
    }
  }

  #compileNextToken() {
    this.#tokenizer.advance();
    this.#compileToken();
  }

  #compileSubroutineCall() {
    this.#compileToken(); // identifier
    this.#compileNextToken(); // '(' or '.'

    if (this.#tokenizer.symbol() === '(') {
      this.#tokenizer.advance();
      this.compileExpressionList();
      this.#compileToken(); // ')'
    } else if (this.#tokenizer.symbol() === '.') {
      this.#compileNextToken(); // subroutine name
      this.#compileNextToken(); // '('
      this.#tokenizer.advance();
      this.compileExpressionList();
      this.#compileToken(); // ')';
    }
  }

  #wrapExpression() {
    this.#compileToken(); // '(', '['
    this.#tokenizer.advance();
    this.compileExpression();
    this.#compileToken(); // ')', ']'
  }

  #wrapStatements() {
    this.#compileNextToken(); // '{'
    this.#tokenizer.advance();
    this.compileStatements();
    this.#compileToken(); // '}'
  }

  constructor(tokenizer, writeStream) {
    this.#tokenizer = tokenizer;
    this.#writeStream = writeStream;
  }

  compileClass() {
    this.#writeStream.write('<class>\n');
    this.#compileToken(); // class identifier

    while (this.#tokenizer.hasMoreTokens()) {
      this.#compileNextToken();
    }

    this.#writeStream.write('</class>\n');
  }

  /* class, int, void, boolean, else, null */
  compileKeyword() {
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`);
  }

  compileClassVarDec() {
    this.#writeStream.write('<classVarDec>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'field' | 'static' keyword
    this.#tokenizer.advance();

    while (this.#tokenizer.symbol() !== ';') {
      this.#compileToken();
      this.#tokenizer.advance();
    }

    this.#compileToken(); // ';'

    this.#writeStream.write('</classVarDec>\n');
  }

  compileVarDec() {
    this.#writeStream.write('<varDec>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'var' keyword

    this.#tokenizer.advance();
    while (this.#tokenizer.symbol() !== ';') {
      this.#compileToken();
      this.#tokenizer.advance();
    }

    this.#compileToken(); // ';'

    this.#writeStream.write('</varDec>\n');
  }

  compileSubroutine() {
    this.#writeStream.write('<subroutineDec>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // (constructor|method|function)
    this.#tokenizer.advance();

    while (this.#tokenizer.symbol() !== '(') {
      // (void | type identifier) - 1st token
      // (method | function identifier) - 2nd token
      this.#compileToken();
      this.#tokenizer.advance();
    }

    this.#compileToken(); // '('
    this.#tokenizer.advance();
    this.compileParameterList();
    this.#compileToken(); // enclosing ')' of parameter list

    this.#tokenizer.advance(); // advances tokenizer to '{' to begin subroutine body
    this.compileSubroutineBody();

    this.#writeStream.write('</subroutineDec>\n');
  }

  compileLet() {
    this.#writeStream.write('<letStatement>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'let' keyword

    this.#compileNextToken(); // varName
    this.#tokenizer.advance();

    if (this.#tokenizer.symbol() === '[') {
      this.#wrapExpression(); // [ expression ]
      this.#tokenizer.advance();
    }

    this.#compileToken(); // '='
    this.#tokenizer.advance();
    this.compileExpression();

    if (this.#tokenizer.symbol() === ';') {
      this.#compileToken(); // ';'
    } else {
      this.#compileNextToken(); // ';'
    }

    this.#writeStream.write('</letStatement>\n');
  }
  compileIf() {
    this.#writeStream.write('<ifStatement>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'if' keyword

    this.#tokenizer.advance(); // advances tokenizer to '('
    this.#wrapExpression(); // ( expression )
    this.#wrapStatements(); // { statements }

    if (this.#tokenizer.nextToken()?.keyWord === 'else') {
      this.#tokenizer.advance();
      this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'else' keyword
      this.#wrapStatements(); // { statements }
    }

    this.#writeStream.write('</ifStatement>\n');
  }
  compileDo() {
    this.#writeStream.write('<doStatement>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`);

    this.#tokenizer.advance();
    this.#compileSubroutineCall();

    this.#compileNextToken(); // ';'

    this.#writeStream.write('</doStatement>\n');
  }

  compileWhile() {
    this.#writeStream.write('<whileStatement>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'while' keyword

    this.#tokenizer.advance(); // sets token to '('
    this.#wrapExpression(); // ( expression )
    this.#wrapStatements(); // { statements }

    this.#writeStream.write('</whileStatement>\n');
  }

  compileReturn() {
    this.#writeStream.write('<returnStatement>\n');
    this.#writeStream.write(`<keyword> ${this.#tokenizer.keyword()} </keyword>\n`); // 'return' keyword

    this.#tokenizer.advance();
    if (this.#tokenizer.symbol() !== ';') {
      this.compileExpression();
    }

    this.#compileToken(); // ';'

    this.#writeStream.write('</returnStatement>\n');
  }

  compileParameterList() {
    this.#writeStream.write('<parameterList>\n');

    while (this.#tokenizer.symbol() !== ')') {
      this.#compileToken();
      this.#tokenizer.advance();
    }

    this.#writeStream.write('</parameterList>\n');
  }

  compileSubroutineBody() {
    this.#writeStream.write('<subroutineBody>\n');

    this.#compileToken(); // '{'
    this.#tokenizer.advance();

    while (this.#tokenizer.keyword() === 'var') {
      this.compileVarDec();
      this.#tokenizer.advance();
    }

    this.compileStatements();
    this.#compileToken(); // '}'

    this.#writeStream.write('</subroutineBody>\n');
  }

  compileStatements() {
    this.#writeStream.write('<statements>\n');

    while (this.#tokenizer.symbol() !== '}') {
      this.#compileToken();

      if (this.#tokenizer.hasMoreTokens()) {
        this.#tokenizer.advance();
      }
    }

    this.#writeStream.write('</statements>\n');
  }

  compileExpression() {
    this.#writeStream.write('<expression>\n');

    this.compileTerm();
    this.#tokenizer.advance();

    if (CompilationEngine.#OPERATORS.includes(this.#tokenizer.symbol())) {
      this.#compileToken(); // '+', '-', '*', '/', '&', '|', '<', '>', '='
      this.#tokenizer.advance();
      this.compileTerm();
      this.#tokenizer.advance();
    }

    this.#writeStream.write('</expression>\n');
  }

  compileTerm() {
    this.#writeStream.write('<term>\n');

    const tokenType = this.#tokenizer.tokenType();
    const currentSymbol = this.#tokenizer.symbol();
    const nextSymbol = this.#tokenizer.nextToken()?.symbol;
    const currentKeyword = this.#tokenizer.keyword();

    if (['STRING_CONST', 'INT_CONST'].includes(tokenType)) {
      this.#compileToken(tokenType);
    } else if (['true', 'false', 'null', 'this'].includes(currentKeyword)) {
      this.#writeStream.write(`<keyword> ${currentKeyword} </keyword>\n`);
    } else if (tokenType === 'IDENTIFIER') {
      if (nextSymbol === '[') {
        this.#compileToken(tokenType); // varName
        this.#tokenizer.advance(); // sets tokenizer to '['
        this.#wrapExpression(); // [ expression ]
      } else if (['(', '.'].includes(nextSymbol)) {
        this.#compileSubroutineCall();
      } else {
        this.#compileToken(tokenType); // varName
      }
    } else if (tokenType === 'SYMBOL' && currentSymbol === '(') {
      this.#wrapExpression(); // ( expression )
    } else if (tokenType === 'SYMBOL' && ['~', '-'].includes(currentSymbol)) {
      this.#compileToken(tokenType); // '~' or '-'
      this.#tokenizer.advance();
      this.compileTerm();
    }

    this.#writeStream.write('</term>\n');
  }

  compileExpressionList() {
    this.#writeStream.write('<expressionList>\n');

    if (this.#tokenizer.symbol() !== ')') {
      this.compileExpression();

      while (this.#tokenizer.symbol() === ',') {
        this.#compileToken(); // ',' symbol
        this.#tokenizer.advance();
        this.compileExpression();
      }
    }

    this.#writeStream.write('</expressionList>\n');
  }
}
