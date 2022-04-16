/* 

=== ANALISADOR LÉXICO ===
[*] Lexer para JS: https://github.com/sormy/flex-js


*/
const fs = require("fs");
const Lexer = require('flex-js');
const filePath = './cool-examples/hello_world.cl'

// Converte arquivo em .cl para string.
const content = fs.readFileSync(filePath).toString();

var lexer = new Lexer();

// options
lexer.setIgnoreCase(true);  

//lexer.setDebugEnabled(true); 

// Função para otimizar a criação de Rules a partir da Definição

const setDefinitionAndRule = (param, paramToken) => {
    lexer.addDefinition(param, paramToken);
    const ruleParam = RegExp('{'+param+'}')
    lexer.addRule(ruleParam, function (lexer) {
    });     
    //    console.log(`Found ${param} : ` + lexer.text);
}

// Common definitions

const common = [] 

common.push({param: 'BlockInit', paramToken: /\{/ });
common.push({param: 'BlockEnd', paramToken: /\}/ });
common.push({param: 'ParentesisInit', paramToken: /\(/ });
common.push({param: 'ParentesisEnd', paramToken: /\(/ });
common.push({param: 'Colon', paramToken: /\:/ });
common.push({param: 'Comma', paramToken: /\,/ });
common.push({param: 'Dot', paramToken: /\./ });
common.push({param: 'SemiColon', paramToken: /\;/ });
common.push({param: 'SingleLineComment', paramToken: /\-\-[^\n]*/ });

// COMMON BACKUP

// lexer.addDefinition('BlockInit', /\{/);
// lexer.addDefinition('BlockEnd', /\}/);
// lexer.addDefinition('ParentesisInit', /\(/);
// lexer.addDefinition('ParentesisEnd', /\(/);
// lexer.addDefinition('Colon', /\:/);
// lexer.addDefinition('Comma', /\,/);
// lexer.addDefinition('Dot', /\./);
// lexer.addDefinition('SemiColon', /\;/);
// lexer.addDefinition('SingleLineComment', /\-\-[^\n]*/);

// Types
const types = []

types.push({ param: 'Int', paramToken: /[0-9]+/ });
types.push({param: 'Float', paramToken: /[0-9]+\.[0-9]+/ });

// TYPES BACKUP

// lexer.addDefinition('Int', /[0-9]+/);
// lexer.addDefinition('Float', /[0-9]+\.[0-9]+/);

// Operators

const operators = []

operators.push({ param: 'Plus', paramToken: /\+/ });
operators.push({ param: 'Minus', paramToken: /\-/ });
operators.push({ param: 'Multiply', paramToken: /\*/ });
operators.push({ param: 'Divide', paramToken: /\// });
operators.push({ param: 'Equal', paramToken: /\=/ });
operators.push({ param: 'LessThan', paramToken: /\</ });
operators.push({ param: 'LessThanOrEqual', paramToken: /\<\=/ });
operators.push({ param: 'Assign', paramToken: /\<\-/ });
operators.push({ param: 'IntComp', paramToken: /\~/ });
operators.push({ param: 'Arrow', paramToken: /\=\>/ });

// OPERATORS BACKUP
// lexer.addDefinition('Plus', /\+/);
// lexer.addDefinition('Minus', /\-/);
// lexer.addDefinition('Multiply', /\*/);
// lexer.addDefinition('Divide', /\//);
// lexer.addDefinition('Equal', /\=/);
// lexer.addDefinition('LessThan', /\</);
// lexer.addDefinition('LessThanOrEqual', /\<\=/);
// lexer.addDefinition('Assign', /\<\-/);
// lexer.addDefinition('IntComp', /\~/);
// lexer.addDefinition('Arrow', /\=\>/);

const allDefinitions = [...common, ...types, ...operators]

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

allDefinitions.map((c) => {
    setDefinitionAndRule(c.param, c.paramToken)
})

//WHITESPACE RULE
lexer.addRule(/\s+/);

console.log('Lexer ', lexer);

lexer.setSource(content);
lexer.lex();
