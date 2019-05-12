var Dialog = require('dialog');


var dialog1 = new Dialog({
    element: 'dialog1',
    onConfirm:function(event){
        console.log(this, event);
        alert('aaaa1');
        //this.close();
    },
    onCancel:function(event){
        alert('bbbb');
        this.close();
    }
})


var dialog2 = new Dialog({
    element: 'dialog2',
    onConfirm:function(event){
      console.log(this, event);
        alert('aaaa2');
        //this.close();
    },
    onCancel:function(event){
        alert('bbbb');
        this.close();
    }
})

var btn1 = document.getElementById('showDialog1');
btn1.addEventListener('click',function(){
    dialog1.open();
});

var btn2 = document.getElementById('showDialog2');

btn2.addEventListener('click',function(){
    dialog2.open();
});
