var Vue = require('vue');
var InlineDesc =  require('../../inline-desc/scripts/main.js');

module.exports = Vue.extend({
  template: __inline('../templates/index.html'),
  components: {
    InlineDesc : InlineDesc
  },
  props: {
    title: {
      type: String
    },
    items: {
      type: Array
    },
  }
});
