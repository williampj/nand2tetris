type Var = { kind: string, type: string, index: number}
type Table = { [key: string]: Var }
type Indexer = { [key: string]: number }

interface DefineParams {
  name: string, 
  type: string, // int, bool, char, className
  kind: string  // field, static, arg, var
}

export default class SymbolTable {
  private table: Table
  private indexCounter: Indexer = {
    STATIC: 0,
    FIELD: 0,
    ARG: 0,
    VAR: 0
  }
  
  /* Creates a new symbol table */
  constructor() {
    this.table = {};
  }

  /* Defines a new variable, adds it to the table and increments the index for that kind */
  define({ name, type, kind }: DefineParams): void { 
    const index: number = this.indexCounter[kind];
    this.table[name] = { type, kind, index };
    this.indexCounter[kind] += 1;
  }

  /* Returns the index of the named variable */
  indexOf(name: string): number {
    return this.table[name]?.index
  }

  /* Returns the kind of the named identifier. 
   *
   * @param  name     name of the kind of symbol
   * @return string   STATIC, FIELD, ARG, VAR or NONE
   */ 
  kindOf(name: string): string {
    return this.table[name]?.kind || 'NONE'
  }

  /* Empties symbol table and resets indexes to zero */
  reset(): void {
    Object.keys(this.indexCounter).forEach(index => this.indexCounter[index] = 0)
  }

  /* Returns the type of the named variable */
  typeOf(name: string): string {
    return this.table[name]?.type || 'NONE'
  }

  /* Returns the number of variables of the given kind defined in the table */
  varCount(kind: string): number {
    return this.indexCounter[kind]
  } 
}