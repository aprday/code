
(function(root, factory){
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        module.exports = factory(document);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req) {
            // Load moment.js as an optional dependency
            return factory(document);
        });
    } else {
        root.Pikaday = factory(document);
    }
})(this, function(document){
  //设置Dialog的参数
  var defaults = {
      element:'',
      style:'',
      modal:false
  },
  hasEventListeners = !!window.addEventListener,
  addEvent = function (el, type, callback, capture){
      if (hasEventListeners) {
          el.addEventListener(type, callback, !!capture);
      } else {
          el.attachEvent('on' + type, callback);
      }
  },
  removeEvent = function (el, type, callback, capture) {
      if (hasEventListeners) {
          el.removeEventListener(type, callback, !!capture);
      } else {
          el.detachEvent('on' + type, callback);
      }
  },
  trim = function(str){
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  },
  removeClass = function (el, cn) {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
  },
  hasClass = function (el, cn) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
  },
  addClass = function (el, cn) {
      if (!hasClass(el, cn)) {
          el.className = (el.className === '') ? cn : el.className + ' ' + cn;
      }
  },
  extend = function (to, from, overwrite) {
            var prop, hasProp;
            for (prop in from) {
                hasProp = to[prop] !== undefined;
                if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                    to[prop] = extend({}, from[prop], overwrite);
                } else if (overwrite || !hasProp) {
                    to[prop] = from[prop];
                }
            }
            return to;
  };
  var Toast = function(options){
      var self = this,
          opts = self.config(options);

      self.el = !!opts.el ? self.render(opts) : undefined;


  };
  Toast.prototype = {
      config :function(options){
          if(options){
              var opts = extend({}, options, true);
          }
          return opts;
      },
      render:function(opts){
          var self = this;
          self.el = document.getElementById(opts.el);
          return self.el;
      },
      show : function(text){
          var self = this,
              content = self.el.querySelector('.content');
          content.innerText = text || content.innerText;
          if (self.el.style.display != 'none') {
              return;
          }
          self.el.style.display = 'block';

          setTimeout(function () {
              self.el.style.display = 'none';
          }, 2000);
      }
    }
      return Toast;
});
