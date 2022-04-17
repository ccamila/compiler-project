const Lexer = require('flex-js');
var lexer = new Lexer();
lexer.addRule('/*', function (lexer) {
  do {
    var char = lexer.input();
    if (char === '*') {
      var nextChar = lexer.input();
      if (nextChar === '/') {
        break;
      }
    }
  } while (char !== '');
});
lexer.setSource('test /* comment */ test');
lexer.lex();