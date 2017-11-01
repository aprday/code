var Vue = require('vue');

module.exports = Vue.extend({
  template: __inline('../templates/index.html'),
  props: {
    type: String
  },
  computed: {
    className: function () {
      return 'weui_icon widget-icon-' + this.type
    }
  }
});
