var bar = [1, 2, 3];
var foo = { a: 1 };
var baz = foo.a = 2;
foo.a === 1;
baz.a === 2;