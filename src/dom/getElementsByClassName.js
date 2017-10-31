function getElementsByClassName(root, className) {
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
}