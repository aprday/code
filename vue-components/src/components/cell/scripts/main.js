var Vue = require('vue');
var InlineDesc =  require('../../inline-desc/scripts/main.js');

module.exports = Vue.extend({
  template: __inline('../templates/index.html'),
  created () {
    if (this.link) {
      this.isLink = true
    }
  },
  components: {
    InlineDesc : InlineDesc
  },
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    link: {
      type: String
    },
    inlineDesc: {
      type: String
    },
    primary: {
      type: String,
      default: 'title'
    }
  },
  data () {
    return {
      isLink: false
    }
  }
});
