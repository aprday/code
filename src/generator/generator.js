function * maker() {
    var index = 0;
    console.log(123);
    while (index < 10) {
        yield index++;
        index ++;
    }
    index ++;
    index ++;
    index ++;
}

var g = maker();

console.log(g.next().value); // 0
console.log(g.next().value); // 1



function * fn() {
    yield 1;
}