var Vue = require('vue');
var InlineDesc =  require('../../inline-desc/scripts/main.js');
var GroupTitle = require('../../group-title/scripts/main.js');

module.exports = Vue.extend({
  template: __inline('../templates/index.html'),
  components: {
    GroupTitle : GroupTitle
  },
  props: {
    title: String,
    titleColor: String
  },
  events: {
    'group.class.add': function (value) {
      this.$el.querySelector('.weui_cells').classList.add(value)
    }
  }
});
