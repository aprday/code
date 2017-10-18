function insertSort(arr) {
    console.log(arr);
    var result = arr.splice(0, 1);
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        var index = result.length;
        for (var j = 0; j < result.length; j++) {
            if (el < result[j]) {
                index = j;
                break;
            }
        }
        result.splice(index, 0, el);
    }
    console.log(result);
    return result;
}

var array = [7, 10, 2, 9, 27, 4];
// console.log(insertSort(array));



function binaryInsertSort(arr) {
    var result = arr.splice(0, 1);
    for (var i = 0; i < arr.length; i++) {
        var el = arr[i];
        var low = 0;
        var high = result.length;
        var mid = 0;
        while(low <= high) {
            mid = Math.floor((high + low) / 2);
            if (el < result[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        result.splice(mid, 0, el);
    }
    return result;
}

var array = [7, 10, 2, 9, 27, 4];
console.log(binaryInsertSort(array));