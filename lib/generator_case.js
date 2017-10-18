"use strict";

(function () {
    console.log(1234);
})();
console.log(1234);
$.ajax({
    type: "POST",
    url: "localhost:8020/api/a",
    dataType: 'json',
    data: "hello world",
    success: function success(msg) {
        console.log(msg);
    }
});