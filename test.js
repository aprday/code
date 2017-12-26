
function* gen1() { 
    var a = yield 1;
    console.log(a);
    yield 2;
    yield 3;
  }
  
function* gen2() { 
    yield 1;
    yield 2;
    yield 3;
}

// function * combine(gs) {
//     let value = undefined;
//     for (let g of gs) {
//         let it = {value: undefined, done: false};
//         while(!it.done) {
//             it = g.next(value);
//             value = yield it.value;
//         }
//     }
// }

// function combine(gens) {
//     var index = 0;
//     return {
//         next: function(value){
//             const it = gens[index].next(value);
//             if (it.done) {
//                 index ++;
//             }
//             return index < gens.length ?
//                 {value: it.value, done: false} :
//                 {done: true};
//         }
//      };
// }
const g = combine([gen1()]);

console.log(g.next().value);
console.log(g.next(3).value);
console.log(g.next().value);

var a = afefa.nafmef;
