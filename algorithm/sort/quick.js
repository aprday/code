function quickSort(arr) {
    console.log('arr', '>>>>>>', arr);
    if (arr.length <= 1) {return arr;}
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    console.log(pivotIndex, pivot);
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        if (el <= pivot) {
            left.push(el);
        } else {
            right.push(el);
        }
    }
    console.log('left', '>>>>>>', left);
    console.log('right', '>>>>', right);
    return quickSort(left).concat([pivot]).concat(quickSort(right));
}

var array = [3, 9, 10, 2, 8, 7, 4, 61];

console.log(quickSort(array));