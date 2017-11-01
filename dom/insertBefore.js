/*JaavaScript DOM 只提供了insertBefore方法：
*   parentElement.insertBefore(newElement, targetElement)
*   targetElement.parentNode.insertBefore(newElement, targetElement)
* 而没有提供insertAfter方法，可以利用DOM已有的属性和方法将其实现，如下。
*/

function insertAfter(newElement, targrtElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
};