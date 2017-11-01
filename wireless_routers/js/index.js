var map = {
    '1': ['1', '2'],
    '2': ['2', '1', '3', '4'],
    '3': ['3', '2', '5'],
    '4': ['4', '2'],
    '5': ['5', '3']
};

//保存所有组合的数组
var result = [];
var count = [];

function getAllCombine(array) {
    var len = array.length;
    for (var i = 1; i <= len; i++)
        getCombine(array, len, i);
    // console.log("数组(" + array.join(",") + ")的所有组合(共" + result.length + "种)如下：<hr>" + result.join("\t"));
    console.log(result.join(","), count);
}

//从数组array(n)中任选m个元素的所有组合(m>=1 && m<=n)。
function getCombine(array, n, m, temp) {
    temp = temp || [];
    for (var i = n; i >= m; i--) {
        temp[m - 1] = array[i - 1]; //取出第n个元素作为组合的第一个元素
        if (m > 1){
            getCombine(array, i - 1, m - 1, temp); //递归，在n-1个元素中取m-1个元素,直到取出最后一个元素
        }
        var combine = temp.join(""); //获得一个组合
        getPoints(map, temp);
    }
}

//查找某元素是否存在数组中,存在返回true,不存在返回false
function isExist(array, value) {
    for (var i = 0; i < array.length; i++)
        if (value == array[i]) return true;
    return false;
}

//查找某元素是否存在数组中,存在返回true,不存在返回false
function getPoints(map, temp) {
    if (!isExist(result, temp.join(""))) {
        result.push(temp.join(""));
        var points = [];
        for (var i = 0; i < temp.length; i++) {
            var value = map[temp[i]];
            for (var j = 0; j < value.length; j++) {
                var ponit = value[j];
                if (!isExist(points, ponit)) {
                    points.push(ponit);
                }
            }
        }
        console.log(temp.join(""), points);
        if (points.length == 5) {
            count++;
        }
    }
}


//测试
var arr = [1, 2, 3, 4, 5];
getAllCombine(arr);
