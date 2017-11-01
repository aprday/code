var roomNumber = 5;
var routerNumber = 1;
var points = [1, 2, 3, 4, 5];
var edges = [
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 3]
];

//保存所有组合的数组
var combines = [];
var totalPoint = 0;

var graph = {};

function buildNodes (points) {
    for (var i = 0; i < points.length; i++) {
        graph[points[i]] = [points[i]];
    }
}

function buildGraph (edges) {
    for (var i = 0; i < edges.length; i++) {
        var points = edges[i];
        graph[points[0]].push(points[1]);
        graph[points[1]].push(points[0]);
    }
}

//从数组array(n)中任选m个元素的所有组合(m>=1 && m<=n)。
function getCombine(array, n, m, temp) {
    temp = temp || [];
    for (var i = n; i >= m; i--) {
        temp[m - 1] = array[i - 1]; //取出第n个元素作为组合的第一个元素
        if (m > 1){
            getCombine(array, i - 1, m - 1, temp); //递归，在n-1个元素中取m-1个元素,直到取出最后一个元素
        }
        // 获取总分数
        getTotalPoint(temp);
    }
}

//查找某元素是否存在数组中,存在返回true,不存在返回false
function isExist(array, value) {
    for (var i = 0; i < array.length; i++){
        if (value == array[i]){
            return true;
        }
    }
    return false;
}

//查找某元素是否存在数组中,存在返回true,不存在返回false
function getTotalPoint(temp) {
    var combine = temp.join('');
    if (!isExist(combines, combine)) {
        var points = [];
        var calculatePoint = 0;
        for (var i = 0; i < temp.length; i++) {
            var array = graph[temp[i]];
            for (var j = 0; j < array.length; j++) {
                var ponit = array[j];
                if (!isExist(points, ponit)) {
                    points.push(ponit);
                }
            }
        }
        for (var k = 0; k < points.length; k++) {
            calculatePoint += points[k];
        }
        combines.push(combine);
        if (totalPoint  < calculatePoint) {
            totalPoint = calculatePoint;
        }
    }
}

buildNodes(points);

buildGraph(edges);

//测试
getCombine(points, points.length, 2);
console.log(combines, totalPoint);
