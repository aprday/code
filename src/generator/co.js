import co from 'co';
import fs from 'fs';

function getThunk(number) {
    return function (fn) {
        setTimeout(() => {
            if (number) {
                fn(null, number);
            } else {
                const err = "error open";
                fn(err);
            }
        }, number)
    }
}

console.log("callback origin co : ==========");
const fn = co(function * () {
    var a = yield getThunk(100);
    var b = yield getThunk(1000);
    console.log('a:', a);
    console.log('b:', b);
    return [a, b];
})
fn.then((args) => {
    console.log("callback origin co : ==========");
    console.log(args);
});

