"use strict";

/**
 * Module dependencies
 */
const assert = require('chai').assert;

const { isFunction } = require('../../src/js/libs/helpers.lib');
const normalizeSelector = require('../../src/js/libs/normalize.lib');

suite('normalize');

test('should be function', () => {
  assert.equal(typeof normalizeSelector, 'function', 'wrong type');
});

test('should normalize BIG SELECTOR', function () {
  const selector = "*~*>*.foo[   href *=  \"/\"   ]:hover>*[  data-foo =   " +
                 "\"bar\"      ]:focus+*.baz::after";
  const expected = "* ~ * > *.foo[href*=\"/\"]:hover > *[data-foo=\"bar\"]:" +
                 "focus + *.baz::after";
  assert.equal(normalizeSelector(selector), expected);
});

test('should return optimized selector with no change', function () {
  assert.equal(normalizeSelector("#foo .bar"), "#foo .bar");
});

test('should trim whitespace', function () {
  assert.equal(normalizeSelector(" #foo   .bar "), "#foo .bar");
});

test('should separate between combinators', function () {
  assert.equal(normalizeSelector("#foo>.bar+.baz"), "#foo > .bar + .baz");
});

test('should not separate concatenated classes', function () {
  assert.equal(normalizeSelector("#foo.bar.baz"), "#foo.bar.baz");
});

test('should normalize asterisks', function () {
  const selector = " *.class[ data * = 'data' ] ";
  assert.equal(normalizeSelector(selector), "*.class[data*='data']");
});

test('should remove comments', function () {
  assert.equal(normalizeSelector(".e1 /* c2 */ .e2"), ".e1 .e2");
  assert.equal(normalizeSelector(" /*c1*/ .e1/*c2*/.e2 /*c3*/ .e3 /*c4*/ "), ".e1 .e2 .e3");
  assert.equal(normalizeSelector(" /*c1*/ .e1/*c2*/.e2 /*c3*/ .e3 "), ".e1 .e2 .e3");
  assert.equal(normalizeSelector("/*c1*/.e1/*c2*/.e2 /*c3*/ .e3"), ".e1 .e2 .e3");
  assert.equal(normalizeSelector(".e1/*c2*/.e2 /*c3*/ .e3"), ".e1 .e2 .e3");
});

test('should replace comments with single whitespace', function () {
  assert.equal(normalizeSelector("tag/* c2 */tag"), "tag tag");
});

test('should normalize parentheses', function() {
  const selector = "((a ) (b(c ) ) d )>*[ data-foo = \"bar\" ]";
  const expected = "((a)(b(c))d) > *[data-foo=\"bar\"]";
  assert.equal(normalizeSelector(selector), expected);
});

test('should normalize @-rule parentheses', function () {
  const selector = "@media  screen  and  ( color ),  projection  and  (color )";
  const expected = "@media screen and (color), projection and (color)";
  assert.equal(normalizeSelector(selector), expected);
});

test('should normalize @-rules with compound parentheses', function () {
  const selector = "@media  handheld  and  ( min-width : 20em ),   screen  " +
                 "and  ( min-width: 20em )";
  const expected = "@media handheld and (min-width:20em), screen and " +
                 "(min-width:20em)";
  assert.equal(normalizeSelector(selector), expected);
});

test('should normalize @-rules with operations', function () {
  const selector = "@media  screen  and  ( device-aspect-ratio : 2560 / 1440 )";
  const expected = "@media screen and (device-aspect-ratio:2560/1440)";
  assert.equal(normalizeSelector(selector), expected);
});

test('should normalize descriptors', function () {
  const selector = "@counter-style    triangle";
  assert.equal(normalizeSelector(selector), "@counter-style triangle");
});

test('should normalize case-insensitivity attribute selector', function () {
  assert.equal(normalizeSelector("[ att ~= val  i ]"), "[att~=val i]");
  assert.equal(normalizeSelector("#foo[  a  =  \"b\"  i  ]"), "#foo[a=\"b\" i]");
});

test('should normalize namespaced attribute selector', function () {
  const selector = ' unit[ sh | quantity = "200" ] ';
  const expected = 'unit[sh|quantity="200"]';
  assert.equal(normalizeSelector(selector), expected);
});

test('should normalize pseudo-classes', function () {
  const selector = "   :nth-last-of-type( )   ";
  assert.equal(normalizeSelector(selector), ":nth-last-of-type()");
});

test('should normalize pseudo-elements', function () {
  const selector = "   ::nth-fragment(   )   ";
  assert.equal(normalizeSelector(selector), "::nth-fragment()");
});

test('should normalize backslashes', function () {
  const selector = "#foo[ a = \" b \\\" c\\\\\" ]";
  const expected = "#foo[a=\" b \\\" c\\\\\"]";
  assert.equal(normalizeSelector(selector), expected);
});