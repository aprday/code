
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
  bind = function(e,  callback, scope, target, arguments){
    //定义监听器
    var self = this;
    // 处理浏览器兼容
    e = e || window.event;
    var targetNode = e.target || e.srcElement;
    // 测试如果点击的是TR就触发
    var name = target ? target.className : undefined,
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
  /*
  addEvent = function(el, eventType, targetElement, callback){
    // 获得父元素DIV, 添加监听器...
    el.addEventListener(eventType,function(e) {
      var self = this;
      // 处理浏览器兼容
      e = e || window.event;
      var targetNode = e.target || e.srcElement;
      // 测试如果点击的是TR就触发
      var element = targetElement,
          className = targetNode.className;
      className = className.split(' ');
          // 选择包含 class 的元素
          if (className.indexOf('' + element + '') === -1) {
              return;
          }else {
              callback(e);
          }
    });
  },
  */
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
  var Dialog = function(options){
      var self = this,
          opts = self.config(options);

      self.el = !!opts.element ? self.render(opts) : undefined;


  };
  Dialog.prototype = {
      config :function(options){
          if(options){
              var opts = extend({}, options, true);
          }
          return opts;
      },
      render:function(opts){
          var self = this;
            //  confirm = 'confirm',
            //  cancel = 'cancel';
          self.el = document.getElementById(opts.element);
          var confirm = self.el.querySelector('.confirm'),
              cancel = self.el.querySelector('.cancel');

          self._onConfirm = function(e){
              if (typeof opts.onConfirm === 'function') {
                    bind(e, opts.onConfirm, self, confirm, [e, e.target || e.srcElement]);
                    //opts.onSelect.apply(self, [e, el]);
              }
          };
          self._onCancel = function(e){
              if (typeof opts.onCancel === 'function') {
                    bind(e, opts.onCancel, self, cancel, [e, e.target || e.srcElement]);
                    //opts.onSelect.apply(self, [e, el]);
              }
          };
          if(getElementsByClassName(self.el, confirm)){
              addEvent(self.el, 'click', self._onConfirm, true);
          }
          if(getElementsByClassName(self.el, cancel)){
              addEvent(self.el, 'click', self._onCancel, true);
          }
          return self.el;
      },
      open : function (el) {
          var self = this;
          self.el = el && (typeof el === 'object') ? el : self.el;
          self.el.style.cssText = 'display: block';
          return true;
      },
      close :function(el){
          var self = this;
          self.el = (typeof el === 'object') ? el : self.el;
          self.el.style.cssText = 'display: none';
          return true;
      }
    }
      return Dialog;
});
