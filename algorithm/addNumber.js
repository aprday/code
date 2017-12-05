function func(num) {
    var sum = num;
    function fn(num) {
        sum += num;
        return fn;
    }
    setTimeout(function() {
        console.log(sum);
    }, 0);
    return fn;
}

func(1)(2)(3)(4)(5);