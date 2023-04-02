export default class SymbolTable {
    /* Creates a new symbol table */
    constructor() {
        this.indexCounter = {
            STATIC: 0,
            FIELD: 0,
            ARG: 0,
            VAR: 0
        };
        this.table = {};
    }
    /* Defines a new variable, adds it to the table and increments the index for that kind */
    define({ name, type, kind }) {
        const index = this.indexCounter[kind];
        this.table[name] = { type, kind, index };
        this.indexCounter[kind] += 1;
    }
    /* Returns the index of the named variable */
    indexOf(name) {
        return this.table[name]?.index;
    }
    /* Returns the kind of the named identifier.
     *
     * @param  name     name of the kind of symbol
     * @return string   STATIC, FIELD, ARG, VAR or NONE
     */
    kindOf(name) {
        return this.table[name]?.kind || 'NONE';
    }
    /* Empties symbol table and resets indexes to zero */
    reset() {
        Object.keys(this.indexCounter).forEach(index => this.indexCounter[index] = 0);
    }
    /* Returns the type of the named variable */
    typeOf(name) {
        return this.table[name]?.type || 'NONE';
    }
    /* Returns the number of variables of the given kind defined in the table */
    varCount(kind) {
        return this.indexCounter[kind];
    }
}
