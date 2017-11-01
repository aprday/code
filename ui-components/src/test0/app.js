var Vue = require('vue');


var vm = new Vue({
		el:'#app',
		data:{
			msg: 'hello world'
		}
});
vm.$data.msg = "new";
  console.log(vm.$el.textContent === "new"); //false

setTimeout(function(){
  console.log(vm.$el.textContent === "new"); //true
}, 2000);
