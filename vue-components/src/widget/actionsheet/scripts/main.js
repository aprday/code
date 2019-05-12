var ActionSheet = require('ActionSheet');


var actionSheet = new ActionSheet({
  el:'actionSheet-wrap',
  onSelect:function(event, el){
    console.log(event, el);
    alert('this select');
  },
  onCancel:function(){
    alert('i hava be cancel');
    this.close();
  }
});

var btn1 = document.getElementById('showActionSheet');
btn1.addEventListener('click',function(){
    actionSheet.open();
});
