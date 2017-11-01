var Vue = require('vue');
var InlineDesc =  require('../../inline-desc/scripts/main');

module.exports = Vue.extend({
  template: __inline('../templates/index.html'),
  components: {
    InlineDesc : InlineDesc
  },
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      twoWay: true
    },
    inlineDesc: {
      type: String
    }
  },
  ready: function () {},
  watch: {
    value: function (newVal) {
      this.$dispatch('change', newVal)
    }
  }
});
