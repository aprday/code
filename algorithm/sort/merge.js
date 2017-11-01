function mergeSort(arr) {
    var left = [1, 5, 6];
    var right = [2, 9];
    var result = [];
    function merge(left, right) {
        
        var tmp = [];
        while (left.length && right.length) {
            var leftNumber = left[0];
            var rightNumber = right[0];
            if (leftNumber < rightNumber) {
                var array = left.splice(0, 1);
                tmp = tmp.concat(array);
            } else {
                var array = right.splice(0, 1);
                tmp = tmp.concat(array);
            }
        }
        var last = left.length ? left : right || [];
        result = tmp.concat(last);
        return result;
    }
    // console.log(merge(left, right));
    function sort(array) {
        var length = array.length,
        mid = Math.floor(length * 0.5),
        left = array.slice(0, mid),
        right = array.slice(mid, length);
    
        if (length === 1) {
          return array;
        }
        return merge(sort(left), sort(right));
    }
    sort(array);
    return result;
}

var array = [7, 10, 2, 9, 27, 4, 3];
console.log(mergeSort(array));