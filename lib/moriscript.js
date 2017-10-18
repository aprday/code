'use strict';

// moriscript.js

module.exports = function (babel) {
    var t = babel.types;
    function moriMethod(name) {
        var exp = t.memberExpression(t.identifier('mori'), t.identifier(name));
        exp.passed = true;
        return exp;
    }
    return {
        visitor: {
            ArrayExpression: function ArrayExpression(path) {
                path.replaceWith(t.callExpression(moriMethod('vector'), path.node.elements));
            },
            ObjectExpression: function ObjectExpression(path) {
                var props = [];
                path.node.properties.forEach(function (prop) {
                    props.push(t.stringLiteral(prop.key.name), t.NumericLiteral(prop.value.value));
                });
                path.replaceWith(t.callExpression(moriMethod('hashMap'), props));
            },
            AssignmentExpression: function AssignmentExpression(path) {
                var props = [];
                props.push(path.node.left.object);
                props.push(path.node.left.property);
                props.push(path.node.right);
                path.replaceWith(t.callExpression(moriMethod('assoc'), props));
            },
            MemberExpression: function MemberExpression(path) {
                if (path.node.passed) return;
                if (t.isAssignmentExpression(path.parent)) return;
                if (t.isIdentifier(path.node.property)) {
                    path.node.property = t.stringLiteral(path.node.property.name);
                }
                path.replaceWith(t.callExpression(moriMethod('get'), [path.node.object, path.node.property]));
            }
        }
    };
};