var name = 'HELLO';
(function () {
    if (typeof name === 'undefined') {
        var name = 'GOODBEY'
        console.log(name + ' jack');
    } else {
        console.log(name + ' jack');
    }
})()