var Vue = require('vue');

var Switch = require('./components/switch/scripts/switch');
var Cell = require('./components/cell/scripts/main');
var Group = require('./components/group/scripts/main');
var XInput = require('./components/input/scripts/main');

var vue = new Vue({
    el:'#app',
    components:{
      Switch:Switch,
      Cell : Cell,
      Group : Group,
      XInput : XInput
    }
});

console.log(vue);

console.log(module);
