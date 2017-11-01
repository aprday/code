var Toast = require('toast');


console.log('aaaa');
var toast = new Toast({
    el:'toast'
});


var btn1 = document.getElementById('showToast');
btn1.addEventListener('click',function(){
    toast.show('这是我的toast');
});
