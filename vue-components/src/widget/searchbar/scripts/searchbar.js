
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
  var SearchBar = function(options){
      var self = this,
          opts = self.config(options);

      self.el = !!opts.el ? self.render(opts) : undefined;


  };
  SearchBar.prototype = {
      config :function(options){
          if(options){
              var opts = extend({}, options, true);
          }
          return opts;
      },
      render:function(opts){
          var self = this;
          console.log('aaaaaaa');
          self.el = document.getElementById(opts.el);
          self.trigger  = document.getElementById(opts.feild);
          var searchBar = self.el,
              searchShow = self.trigger,
              searchInput = self.el.querySelector('#search_input'),
              searchText = self.el.querySelector('#search_text'),
              searchCancel = self.el.querySelector('#search_cancel'),
              searchClear = self.el.querySelector('#search_clear');
          self._onFocus = function(e){
              console.log('focus', searchInput.value);
              addClass(searchBar, 'weui_search_focusing');
              searchText.style.display = 'none';
          };
          self._onBlur = function(e){
              console.log('blur', searchInput.value);
              removeClass(searchBar, 'weui_search_focusing');
              if(!!searchInput.value){
                  searchText.style.display = 'none';
              }else{
                  searchText.style.display = 'block';
              }
          };
          self._onInput = function(e){
              console.log('input', searchInput.value);
              if(!!searchInput.value){
                  searchShow.style.display = 'block';
              }else{
                  searchShow.style.display = 'none';
              }
          };
          self._onCancel = function(e){
              console.log('cancel', searchInput.value);
              searchShow.style.display = 'none';
              searchInput.value = "";
          };
          self._onClear = function(e){
              console.log('clear', searchInput.value);
              searchShow.style.display = 'none';
              searchInput.value = "";
          };
          addEvent(searchInput, 'focus', self._onFocus, true);
          addEvent(searchInput, 'blur', self._onBlur, true);
          addEvent(searchInput, 'input', self._onInput, true);
          addEvent(searchCancel, 'touchend', self._onCancel, true);
          addEvent(searchClear, 'touchend', self._onClear, true);
          return self.el;
      }
    }
      return SearchBar;
});
