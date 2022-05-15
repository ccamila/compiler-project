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

// === OPTIONS === 
lexer.setIgnoreCase(true);  
// lexer.setDebugEnabled(true); 
// ===   ===   ===

// Função para otimizar a criação de Rules a partir da Definição
const setDefinitionAndRule = (param, paramToken) => {
    lexer.addDefinition(param, paramToken);
    const ruleParam = RegExp('{'+param+'}')
    lexer.addRule(ruleParam, function (lexer) {
        console.log(`\n Found ${param}: `+lexer.text);
    });     
}

// Common definitions
const common = [] 

common.push({param: 'At', paramToken: /\@/ });
common.push({param: 'BlockInit', paramToken: /\{/ });
common.push({param: 'BlockEnd', paramToken: /\}/ });
common.push({param: 'ParentesisInit', paramToken: /\(/ });
common.push({param: 'ParentesisEnd', paramToken: /\)/ });
common.push({param: 'Colon', paramToken: /\:/ });
common.push({param: 'Comma', paramToken: /\,/ });
common.push({param: 'Dot', paramToken: /\./ });
common.push({param: 'SemiColon', paramToken: /\;/ });
common.push({param: 'SingleLineComment', paramToken: /\-\-[^\n]*/ }); // checar se é assim mesmo
common.push({param: 'Newline', paramToken: /\n+/ });

// Types
const types = []

types.push({ param: 'Int', paramToken: /[0-9]+/ });
types.push({ param: 'Type', paramToken: /[A-Z][a-zA-Z_0-9]*/})
types.push({ param: 'ID', paramToken: /[a-z_][a-zA-Z_0-9]*/})

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

// Reserved keywords
const tokens = []

tokens.push({ param: 'case', paramToken: /case\b/ })
tokens.push({ param: 'class', paramToken: /class\b/})
tokens.push({ param: 'else', paramToken: /else\b/})
tokens.push({ param: 'esac', paramToken: /esac\b/})
tokens.push({ param: 'fi', paramToken: /fi\b/})
tokens.push({ param: 'if', paramToken: /if\b/})
tokens.push({ param: 'inherits', paramToken: /inherits\b/})
tokens.push({ param: 'in', paramToken: /in\b/}) 
tokens.push({ param: 'isvoid', paramToken: /isvoid\b/})
tokens.push({ param: 'let', paramToken: /let\b/})
tokens.push({ param: 'loop', paramToken: /loop\b/})
tokens.push({ param: 'pool', paramToken: /pool\b/})
tokens.push({ param: 'then', paramToken: /then\b/})
tokens.push({ param: 'while', paramToken: /while\b/})
tokens.push({ param: 'case', paramToken: /case\b/})
tokens.push({ param: 'esac', paramToken: /esac\b/})
tokens.push({ param: 'new', paramToken: /new\b/})
tokens.push({ param: 'of', paramToken: /of\b/})
tokens.push({ param: 'not', paramToken: /not\b/})
tokens.push({ param: 'true', paramToken: /true\b/})

const allDefinitions = [...common, ...types, ...operators, ...tokens]

let str

lexer.addState('STRING', true);

// Inicio
lexer.addRule('\"', function (lexer) {
    lexer.begin('STRING');
});

// Fim: Volta ao estado inicial
lexer.addStateRule('STRING', '\"', function (lexer) {
    lexer.begin(Lexer.STATE_INITIAL);
    var token = str;
    str = '';
    return token;
});

lexer.addStateRule('STRING', /\n/, function (lexer) {
  throw new Error('Unterminated string constant');
});

// Regra de bloco de comentário
lexer.addRule('(*', function (lexer) {
    do {
      var char = lexer.input();
      if (char === '*') {
        var nextChar = lexer.input();
        if (nextChar === ')') {
          break;
        }
      }
    } while (char !== '');
});

allDefinitions.map((c) => {
    setDefinitionAndRule(c.param, c.paramToken)
})

lexer.addRule('\\', function (lexer) {
    lexer.reject();
  });

//WHITESPACE RULE
lexer.addRule(/\s+/);

// console.log('Lexer ', lexer );

lexer.setSource(content);
lexer.lex();
