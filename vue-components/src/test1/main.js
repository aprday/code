var Vue = require('vue');
var Panel = require('../components/panel/scripts/main');

Vue.component('Panel', Panel);
var com = vue.extend({
	components:{
		Panel:Panel
	},
})
var vm = new Vue({
		el:'#app',
		components:{
			com:com
		},
		data:{
			msg: 'hello world',
			items:[
				{
					image: "../logo.png",
					title: "标题一",
					desc : "一起去旅行，看看旅行的意义"
				},
				{
					image: "../logo.png",
					title : "标题二",
					desc : "这里只不过是个标题，我们有时候需要，嗯，看看标题的样式，容纳后在干掉他"
				}
			]
		}
});


var $       = require('jquery');
require('listX');

var toastrX = require('toastrX');
var root = '#demo';

$('.listX-basic-container').listX({
                  listStyle:     'basic',
                  explainTop:    '<span>top<span>',
                  explainBottom: '<span>bottom<span>',
                  hasArrow:     true,
                  fieldsMap: {
                      text: function(data) {
                          var html = data['_text'];
                          return {
                              html: html
                          };
                      },
                      onTap: function(data) {
                          $.toastrX('tap li');
                      },
                      icon:  function(data) {
                          var src =  data['_icon'];
                          return {
                              src: src
                          };
                      },
                      remark:   function(data) {
                          var html =  data['_remark'];
                          return {
                              html: html
                          };
                      },
                      id:   function(data) {
                          return data['_id'];
                      }
                  },
                  listData: [
                      {
                          _text:     'text1',
                          _icon:     '',
                          _remark:   'remark1',
                          _id: 1
                      },
                      {
                          _text:     'text2',
                          _icon:     '',
                          _remark:   'remark2',
                          _id: 2
                      }
                  ]
              });
