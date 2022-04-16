/* 

=== ANALISADOR LÉXICO ===
[*] Lexer para JS: https://github.com/sormy/flex-js


*/
const fs = require("fs");
const Lexer = require('flex-js');
const filePath = './cool-examples/numbers.cl'

// Converte arquivo em .cl para string.
const content = fs.readFileSync(filePath).toString();

var lexer = new Lexer();

// options
lexer.setIgnoreCase(true);  // does not make sense for this scanner, just for reference
//lexer.setDebugEnabled(true);

const setDefinitionAndRule = (param, paramToken) => {
    lexer.addDefinition(param, paramToken);
    const ruleParam = RegExp('{'+param+'}')
    lexer.addRule(ruleParam, function (lexer) {
       console.log(`Found ${param} : ` + lexer.text);
     });     
}

// Common definitions

const common = []
lexer.addDefinition('BlockInit', /\{/);
lexer.addDefinition('BlockEnd', /\}/);
lexer.addDefinition('ParentesisInit', /\(/);
lexer.addDefinition('ParentesisEnd', /\(/);
lexer.addDefinition('Colon', /\:/);
lexer.addDefinition('Comma', /\,/);
lexer.addDefinition('Dot', /\./);
lexer.addDefinition('SemiColon', /\;/);
lexer.addDefinition('SingleLineComment', /\-\-[^\n]*/);

// Types
// lexer.addDefinition('Int', /[0-9]+/);
lexer.addDefinition('Float', /[0-9]+\.[0-9]+/);

// Operators
lexer.addDefinition('Plus', /\+/);
lexer.addDefinition('Minus', /\-/);
lexer.addDefinition('Multiply', /\*/);
lexer.addDefinition('Divide', /\//);
lexer.addDefinition('Equal', /\=/);
lexer.addDefinition('LessThan', /\</);
lexer.addDefinition('LessThanOrEqual', /\<\=/);
lexer.addDefinition('Assign', /\<\-/);
lexer.addDefinition('IntComp', /\~/);
lexer.addDefinition('Arrow', /\=\>/);


// Reserved keywords
// case
// class
// else
// esac
// fi
// if
// in 
// inherits
// isvoid
// let
// loop
// pool
// then
// while
// case
// esac
// new
// of
// not
// true


// rules
// lexer.addRule(/{Int}/, function (lexer) {
//   console.log('Found int: ' + lexer.text);
// });

// lexer.addRule(/{Float}/, function (lexer) {
//   console.log('Found float: ' + lexer.text);
// });

// lexer.addRule(/{Plus}/, function (lexer) {
//   console.log('Found plus: ' + lexer.text);
// });

// lexer.addRule(/{Assign}/, function (lexer){
//   console.log('Found Assign ' + lexer.text);
// });

setDefinitionAndRule('Int', /[0-9]+/);

//WHITESPACE RULE
lexer.addRule(/\s+/);

//console.log('Lexer ', lexer);

lexer.setSource(content);
lexer.lex();
