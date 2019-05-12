
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
      mask :{},
      actionSheet :{}
  },
  getElementsByClassName = function(root, className) {
    // 特性侦测
    if (root.getElementsByClassName) {
      // 优先使用 W3C 规范接口
      return root.getElementsByClassName(className);
    } else {
      // 获取所有后代节点
      var elements = root.getElementsByTagName('*');
      var result = [];
      var element = null;
      var classNameStr = null;
      var flag = null;

      className = className.split(' ');

      // 选择包含 class 的元素
      for (var i = 0, element; element = elements[i]; i++) {
        classNameStr = ' ' + element.getAttribute('class') + ' ';
        flag = true;
        for (var j = 0, name; name = className[j]; j++) {
          if (classNameStr.indexOf(' ' + name + ' ') === -1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          result.push(element);
        }
      }
      return result;
    }
  },
  hasEventListeners = !!window.addEventListener,
  document = window.document,
  bind = function(e,  callback, scope, target, arguments){
    //定义监听器
    var self = this;
    // 处理浏览器兼容
    e = e || window.event;
    var targetNode = e.target || e.srcElement;
    // 测试如果点击的是TR就触发
    var name = target.className||undefined,
        className = targetNode.className;
    if(target instanceof HTMLElement){
        if(className === name)
            return callback.apply(scope||this, arguments);
            // if this is touch event prevent mouse events emulation
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
            return false;
        }
    }else{
        className = className.split(' ');
        // 选择包含 class 的元素
        if (className.indexOf('' + name + '') === -1) {
            return;
        }else {
            callback(e, targetNode);
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
                return false;
            }
        }
    }
  },
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
  var ActionSheet = function(options){
      var self = this,
          opts = options?self.config(options):defaults;

      self.el = !!opts.el ? self.render(opts) : undefined;


  };
  ActionSheet.prototype = {
      config :function(options){
          if(options){
              var opts = extend({}, options, true);
          }
          return opts;
      },
      render:function(opts){
          var self = this;
          self.el = document.getElementById(opts.el);
          var mask = document.getElementById('mask'),
              actionSheet = document.getElementById('widget-actionsheet');
          defaults.mask = mask;
          defaults.actionSheet = actionSheet;
          var select = self.el.querySelector('.select')
              cancel = self.el.querySelector('.cancel');
          //选中时的事件处理
          self._onSelect = function(e){
              if (typeof opts.onSelect === 'function') {
                    bind(e, opts.onSelect, self, select, [e, e.target || e.srcElement]);
                    //opts.onSelect.apply(self, [e, el]);
              }
          };
          //点击取消按钮的事件处理，包括事件绑定
          self._onCancel = function(e){
              if (typeof opts.onCancel === 'function') {
                    bind(e, opts.onCancel, self, cancel, [e, e.target || e.srcElement]);
              }
          };
          //遮罩层mask点击的时候隐藏的事件处理
          self._onHide = function(e){
              // 隐藏事件处理函数
              self.hide(e);
          }
          if(getElementsByClassName(self.el, select)){
              addEvent(self.el, 'click', self._onSelect, true);
              addEvent(self.el, 'touchend', self._onSelect, true);
          };
          if(getElementsByClassName(self.el, cancel)){
              addEvent(self.el, 'click', self._onCancel, true);
          };
          addEvent(mask, 'click', self._onHide, true);

          /*
          addEvent(actionSheet, 'webkitTransitionEnd', function(e){
              console.log('what2');
              mask.style.display = 'none';
          });
          */
          return self.el;
      },
      hide:function(e){
        var self = this;
        removeClass(defaults.actionSheet,'widget-actionsheet-toggle');
        removeClass(defaults.mask, 'weui_fade_toggle');
        defaults.mask.style.display = 'none';
      },
      open : function (el) {
          var self = this;
          self.el = el && (typeof el === 'object') ? el : self.el;
          addClass(defaults.actionSheet, 'widget-actionsheet-toggle');
          defaults.mask.style.display = 'block';

          addClass(defaults.mask, 'weui_fade_toggle')
          removeEvent(defaults.actionSheet, 'transitionend', self.hide);

          return true;
      },
      close :function(el){
          var self = this;
          self.hide();
          addEvent(defaults.actionSheet, 'transitionend', self.hide);
          return true;
      }
    }
      return ActionSheet;
});
