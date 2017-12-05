function deepClone(obj) {
    if (typeof obj === 'object') {
        var temp = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            temp[key] = deepClone(obj[key]);
        }
        return temp;
    } else {
        return obj;
    }
}

var a = {
    b: [{
        c: 'name'
    }]
}

var n = deepClone(a);

a.b = 'ccc';

console.log(n.b);
console.log(a.b);