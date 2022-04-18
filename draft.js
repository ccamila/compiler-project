const Lexer = require('flex-js');
var str = '';

var lexer = new Lexer();
lexer.addState('str', true);
lexer.addRule('"', function (lexer) {
  lexer.begin('str');
});
lexer.addStateRule('str', '"', function (lexer) {
  lexer.begin(Lexer.STATE_INITIAL);
  var token = str;
  str = '';
  return token;
});
lexer.addStateRule('str', '\n', function (lexer) {
  throw new Error('Unterminated string constant');
});
lexer.addStateRule('str', /\\[0-7]{1,3}/, function (lexer) {
  // octal escape sequence
  var charCode = parseInt(lexer.text.substr(1), 8);
  if (charCode > 255) {
    throw new Error('Constant is out of bounds');
  }
  str += String.fromCharCode(charCode);
});
lexer.addStateRule('str', /\\[0-9]+/, function (lexer) {
  throw new Error('Bad escape sequence');
});
lexer.addStateRule('str', '\\n', function (lexer) {
  str += '\n';
});
lexer.addStateRule('str', '\\t', function (lexer) {
  str += '\t';
});
lexer.addStateRule('str', '\\r', function (lexer) {
  str += '\r';
});
lexer.addStateRule('str', '\\b', function (lexer) {
  str += '\b';
});
lexer.addStateRule('str', '\\f', function (lexer) {
  str += '\f';
});
lexer.addStateRule('str', '\\(.|\n)', function (lexer) {
  str += lexer.text.substr(1);
});
lexer.addStateRule('str', /[^\\\n\"]+/, function (lexer) {
  str += lexer.text;
});

lexer.setSource(
  'bla bla bla "simple text" bla bla bla' +
  'bla bla bla "text with octal ~\\40~ value" bla bla bla' +
  'bla bla bla "text with escaped ~\\n~ new line" bla bla bla' +
  'bla bla bla "text with escaped ~\\t~ tab" bla bla bla' +
  'bla bla bla "text with escaped ~\\r~ carriage return" bla bla bla' +
  'bla bla bla "text with escaped ~\\b~ backspace" bla bla bla' +
  'bla bla bla "text with escaped ~\\f~ form feed" bla bla bla' +
  'bla bla bla "text with escaped ~\\s~ char" bla bla bla'
);

var strings = [];

var token;
while ((token = lexer.lex()) !== Lexer.EOF) {
  strings.push(token);
}

// console.log(strings);